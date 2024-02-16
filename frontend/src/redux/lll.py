# Python Program illustrating
# numpy.delete()

import numpy as geek

#Working on 1D
arr = geek.arange(12).reshape(3, 4)
print("arr : \n", arr)
print("Shape : ", arr.shape)

# deletion from 2D array 
a = geek.delete(arr, 1, -1)
'''
		[[ 0 1 2 3]
		[ 4 5 6 7] -> deleted
		[ 8 9 10 11]]
'''
print("\ndeleteing arr 2 times : \n", a)
print("Shape : ", a.shape)

# deletion from 2D array 
a = geek.delete(arr, 1, -1)
'''
		[[ 0 1* 2 3]
		[ 4 5* 6 7] 
		[ 8 9* 10 11]]
			^
			Deletion
'''
print("\ndeleteing arr 2 times : \n", a)
print("Shape : ", a.shape)
