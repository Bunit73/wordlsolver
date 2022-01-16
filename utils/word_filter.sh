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
