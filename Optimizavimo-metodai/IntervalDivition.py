import numpy as np
from sympy import *
from sympy.plotting import plot
from sympy.calculus.util import *
import matplotlib.pyplot as plt

count =0

def f(x):
     
    global count
    count+=1
    
    return ((x**2-1)**2)/4 -1

def intervalDivitionInHalf():
    global count
    iteration = 0
    functionCall = 0
    epselion = 0.0001
    right = 10
    left = 0
    xm = (right + left)/2
    L = right - left
    fxxm = f(xm)  
    x = [i for i in range(10)]
    y=[((i**2-1)**2)/4 -1 for i in x ]

    plt.plot(x,y)
    while L > epselion:
        x1 = left + L/4
        x2 = right - L/4
        fxx1 = f(x1)
        fxx2 = f(x2)
        if fxx1 < fxxm:
            right = xm
            
            xm = x1
            fxxm = fxx1   
        elif fxx2 < fxxm:
            left = xm
            xm = x2
        
            fxxm = fxx2
        else:
            left = x1
            right = x2
        L = right - left
        iteration += 1
        plt.plot(xm, fxxm, 'bo',markersize=8)
        plt.plot(x1,fxx1,'ro',markersize=6)
        plt.plot(x2,fxx2, 'go',markersize=4)   
            
        print("Žingsnių skaičiai ", iteration, ": Naujas intervalas ", "[ ", left , ", ", right, " ]")
        print("Minimalus taškas ", xm)
    plt.show()
    print("Funkcija iškviečiama: ", count, " kartų")
    print((right+left)/2)
    print("Funkcujos reikšmė= ", fxxm)
