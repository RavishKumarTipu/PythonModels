from numpy import *
import math
import matplotlib.pyplot as plt

t = linspace(0, 1, 1000000)
a = sin(t);
b = cos(t);
  
plt.plot(t,b);
plt.plot(t,a);
plt.plot(a,b);


 

plt.savefig('.//py/results//result.png')
print('model ready'); 