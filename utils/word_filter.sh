#!/bin/sh
start=`date +%s`
echo "Reading Dictionary & Filtering To 5 Letter Words"
#Input file
_db="./all_words.txt"

#Output location
o="./filtered_words.txt"

rm -f $o

# If file exists
if [[ -f "$_db" ]]
then
    # read it
	while IFS= read line
    do
      # remove duplicate chars
      # https://unix.stackexchange.com/questions/419464/remove-duplicate-characters-in-bash
      line=$(printf '%s\n' "$line" | awk -v FS="" '{
           for(i=1; i<=NF; i++)
               if ($i==" " || !a[$i]++) printf "%s", $i; print ""
       }')

      # 5 letters and alpha only
      if [[ ${#line} -eq 5 && $line =~ ^[[:alnum:]]+$  ]]
      then
        echo "$line:l" >> $o
      fi
    done <"$_db"
fi
end=`date +%s`
runtime=$((end-start))
echo "Done ran in $runtime sec"
