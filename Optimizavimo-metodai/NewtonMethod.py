import numpy as np
from sympy import *
from sympy.plotting import plot
from sympy.calculus.util import *
import matplotlib.pyplot as plt

count=0

def Df(x):
    return 3*x**2 - 1

def f(x):
    global count
    count+=1
    
    return x*(x**2-1)

def newton(x0):
    epsilon = 0.0001
    n=0

    xi = x0
    reldiff = 1
    x=[i for i in range(-4,10)]
    y = [((i**2-1)**2)/4 -1 for i in x]
    plt.plot(x,y)
    fxi=f(xi)
    while reldiff >= epsilon:
        xi = xi - fxi/Df(xi)
        fxi=f(xi)
        Dfxn = Df(xi)
        if Dfxn == 0:
            print('Zero derivative. No solution found.')
            return None
        n+=1
        reldiff = fxi/Dfxn
        plt.plot(xi,fxi, 'ro')
        print("Step ", n, ". Minimal point when: x=", xi, ", y=",fxi)
        
    if Dfxn != 0: 
        plt.plot(xi,fxi, 'go')
        plt.show()
        print('Found solution after',n,'iterations.')
        print("Final minimal point: ", xi)
        print("Y=", fxi)
        print("Function calls: ",count)
