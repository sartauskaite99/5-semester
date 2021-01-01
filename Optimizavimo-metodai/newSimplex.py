import pandas as pd
import numpy as np
import math
from sympy.solvers import solve
from sympy import Symbol

def countIndex(dt,val):
    value=[]
    ind=[]
    numb=[]
    number=0
    for l in range(len(dt.index)-1):
        if dt.iloc[l][val] > 0:
            value.append(dt.iloc[l]['b']/ dt.iloc[l][val])
        else:
            value.append(math.inf)
        ind.append(dt[dt['b']==dt.iloc[l]['b']].index[0])
    
    for l in range(len(value)):
        numb.append(dt.iloc[l][val])
        
    for l in range(len(value)):
        for s in range(len(value)):
            if value[l]>value[s]:
                break;
            if value[l]<=value[s] and s==len(value)-1:
                number = l
                dt.rename({ind[l]: val}, inplace=True)
                return dt,number,numb,ind
            if l == s or value[l]<=value[s]:
                continue;
    
def countRows(dt,index,typ,divVal,mulVal):
    rows = dt.loc[index].values
    if typ == 'Div':
        if value != 0:
            for element in range(len(rows)):
                dt.values[index][element] = dt.values[index][element] / mulVal
            return ft
        else:
            return dt
    else:
        if mulVal != 0:
            for element in range(len(rows)):
                dt.loc[index].values[element] = (mulVal * dt.loc[divVal].values[element]) + dt.loc[index].values[element]
            return dt
        else:
            return dt
        
def countTable(dt):
    values = []
    indexes=[]
    x = Symbol('x')
    #find smallest value in row z
    smallestValue = dt.loc['z'].idxmin()
    
    #returns new datatable, index , column of values and column of indexes
    dt,number,values,indexes = countIndex(dt,smallestValue)
    
    #counting rows so value is equal to 0
    for l in range(len(values)-1):
        if l != number:
            mul = solve((x*values[number])+values[l])
            mul1 = mul[0]
            dt = countRows(dt,indexes[l],'Mul',smallestValue,mul1)
    
    #counting z row so value is equal to 0
    z=dt.loc['z'][smallestValue]
    mul = solve((x*values[number])+z)
    mul3 = mul[0]
    dt = countRows(dt,'z','Mul',smallestValue,mul3)
    
    #counting last row so the base value is equal to 1
    rows = dt.loc[smallestValue].values
    for element in range(len(rows)):
        dt.loc[smallestValue].values[element] = dt.loc[smallestValue].values[element] / values[number] 
    display(dt)
    return dt
    
def Simplex():
    dt = pd.DataFrame([[-1,1,-1,-1,1,0,0,8],[2,4,0,0,0,1,0,10],[0,0,1,1,0,0,1,3],[2,-3,0,-5,0,0,0,0]],
                      columns=['x1','x2','x3','x4','x5','x6','x7','b'], 
                      index=['x5','x6','x7','z']
                     ).astype(float);
    print('Pradine lentele')
    display(dt)
    while any(dt.loc['z'].values < 0):
        dt = countTable(dt)
Simplex() 
    