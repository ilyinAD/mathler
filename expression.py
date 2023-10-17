import json
def IsItSign(s):
    if (s == '-' or s == '*' or s == '/' or s == '+'):
        return 1
    return 0

def getNum(s):
    if (IsItSign(s[0]) or IsItSign(s[5])):
        return -1
    for i in range(len(s)):
        if (IsItSign(s[i]) and IsItSign(s[i - 1])):
            return -1
        
    
    vec = []
    num = ""
    sign = 1
    i = 0
    #console.log(s.length)
    #return 1
    while (i < len(s)):
        #console.log(num)
        
        if (not IsItSign(s[i])):
            num += str(s[i])
        
        else:
            if (num[0] == '0' and len(num) != 1):
                return -1
            
            if (s[i] == '+'):
                
                val = int(num) * sign
                #console.log(val)
                vec.append(val)
                sign = 1
                num = ""
            
            elif (s[i] == '-'):
                val = int(num) * sign
                #console.log(val)
                vec.append(val)
                sign = -1
                num = ""
            
            else:
                next_num = ""
                idx = i
                i += 1
                while (i < len(s) and (not IsItSign(s[i]))):
                    next_num += s[i]
                    i += 1
                
                if (next_num[0] == '0'):
                    return -1
                
                if (s[idx] == '*'):
                    val = int(num) * int(next_num)
                    #console.log(val)
                    num = str(val)
                    #console.log(num)
                    #vec.append(num * next_num)
                
                else:
                    val1 = int(num)
                    val2 = int(next_num)
                    if (val2 == 0 or (val1 % val2) != 0):
                        #console.log(-1)
                        return -1
                    
                    else:
                        val = int(num) // int(next_num)
                        num = str(val)
                        #vec.append(num / next_num)
                    
                
                i -= 1
            
            #num = ""
        
        i += 1
    
    #console.log(num)
    if (len(num) != 0 and num[0] == '0' and len(num) != 1):
        return -1
    
    if (len(num) != 0):
        val = int(num) * sign
        vec.append(val)
    
    #console.log(vec)
    result = 0
    for i in range(len(vec)):
        result += vec[i]
    
    #console.log(result)
    return result
f = open('expression.txt', 'w')

ans = []
f.write('[')

vec3 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "+", "*", "/"]
for i1 in range(14):
    for i2 in range(14):
        for i3 in range(14):
            for i4 in range(14):
                for i5 in range(14):
                    for i6 in range(14):
                        s = []
                        s1 = ''
                        s1 += vec3[i1] + vec3[i2] + vec3[i3] + vec3[i4] + vec3[i5] + vec3[i6]
                        s.append(vec3[i1])
                        s.append(vec3[i2])
                        s.append(vec3[i3])
                        s.append(vec3[i4])
                        s.append(vec3[i5])
                        s.append(vec3[i6])
                        #print(s)
                        num1 = getNum(s)
                        
                        if (num1 >= 0 and num1 != -1 and num1 < 1000):
                            #l = [s, num1]
                            #for i in ans:
                            
                            #s = str(l)
                            f.write("    ")
                            f.write("'")
                            f.write(str(s1))
                            f.write("'")
                            f.write(',')
                            f.write("\n")
                            ans.append(s)
f.write(']')

print(len(ans))

