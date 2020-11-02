import numpy as np
from sympy import *
from sympy.plotting import plot
from sympy.calculus.util import *
import matplotlib.pyplot as plt

count = 0

def f(x):
    global count
    count+=1
    
    return ((x**2-1)**2)/4 -1

def goldenSection():
    global count
    right = 10
    left = 0
    epselion = 0.0001
    iteration = 0
    L=right-left
    g=0.618
    x1= right - (g*L)
    x2= left + (g*L)
    fxx1 = f(x1)
    fxx2 = f(x2)
    x=[i for i in range(10)]
    y = [((i**2-1)**2)/4 - 1 for i in x]
        
    plt.plot(x,y)
    while L > epselion:
        if fxx2 < fxx1:
            left = x1
            L= right - left
            plt.plot(x1,fxx1, 'ro',markersize=8)
            plt.plot(x2,fxx2, 'go',markersize=6)
            x1=x2
            x2= left +(g*L)
            fxx1 = fxx2
            fxx2 = f(x2)
        else:
            right = x2
            L = right - left
            plt.plot(x2, fxx2, 'go',markersize=8)
            plt.plot(x1, fxx1, 'ro',markersize=6)
            x2 = x1
            x1 = right - (g*L)
            fxx2 = fxx1
            fxx1 = f(x1)    
            
        iteration += 1  
        
        print("Step ", iteration, ": New Interval is", "[ ", left , ", ", right, " ]")
        print("Minimal point: ", (left+right)/2)
        print("Minimal point: ", f((left+right)/2))
    plt.show()
    print("Function calls: ",count)
