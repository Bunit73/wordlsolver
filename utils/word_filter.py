filtered_words_file = open("filtered_words.txt","w")

word_file = open("all_words.txt", 'r')
words = word_file.readlines()

def word_has_dup_char(word):
    if len("".join(set(word))) == len(word):
        return False
    else:
        return True

for w in words:
    w = w.strip().lower()

    if len(w) == 5 and w.isalpha():
        print(w, file=filtered_words_file)
    else:
        continue


