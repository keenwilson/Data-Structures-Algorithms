## LeetCode 402. Remove K Digits
#  https://leetcode.com/problems/remove-k-digits/
class Solutions:
    def removeKdigits(self, num, k):
        size = len(str(num))
        if k == size:
            return "0"
        # Store the final string in stack
        counter = 0
        mystack = []

        while counter < size:
            while mystack and k > 0 and mystack[-1] > num[counter]:
                # When we find the number that is less that the peak of the stack
                mystack.pop()
                k -= 1
            if num[counter] != "0":
                print("add new num[counter] to the stack")
                print(num[counter])
                mystack.append(num[counter])
                counter += 1
                print(counter, size)
            else:
                print("num is zero")
                print(num[counter])
                counter += 1
                k -= 1
        # Now remove the largest values from the top of the stack
        while mystack and k > 0:
            mystack.pop()
            k -= 1

        # If the stack is not empty, pop the number on the right hand side

        return "".join(mystack)


if __name__ == "__main__":
    solution = Solutions()
    print("first")
    # Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.
    first = solution.removeKdigits("1432219", 3)

    print(first)
    print("second")
    # Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.
    second = solution.removeKdigits("10200", 1)

    print(second)
    print("third")
    # Remove all the digits from the number and it is left with nothing which is 0.
    third = solution.removeKdigits("10", 2)

    print(third)
