f = open('russian_nouns.txt', encoding='UTF8')
fo4 = open('russian_nouns_4.txt', 'wt')
for l in f:     
    n = len(l.strip()) 
    if n==4: fo4.write(l) 
fo4.close()
