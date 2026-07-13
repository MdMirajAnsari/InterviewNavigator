## String sort

```
using System;
using System.Linq;

class Program
{
    static void Main()
    {
        string ar1 = "1,2,1,4,2,1";
        var data = ar1.Split(',').Select(int.Parse).OrderBy(x => x).ToArray();
        Console.WriteLine(string.Join(",", data));
    }
}
```

---

```
using System;
using System.Linq;
using System.Collections.Generic;

public class HelloWorld
{
    public static void Main(string[] args)
    {
        List<int> numbers = new List<int> { 9, 3, 1, 6, 4, 8 };
        var sortedNumbers = numbers.OrderBy(x => x);
        Console.WriteLine(string.Join(" ", sortedNumbers));
    }
}
```

---

## Remove Vowels

```
using System;
using System.Linq;
public class HelloWorld
{
    public static void Main(string[] args)
    {
        string vowels = "aeiou";
        string name = "Some Name with vowels";
        name = new string(name.Where(c => !vowels.Contains(c)).ToArray());
        Console.WriteLine (name);
    }
}
```

---

## Remove Duplicate

```
using System;
using System.Linq;

public class Program
{
	public static void Main()
	{
		string originalString = "amanisaman";
		string newString = string.Join(" ", originalString.ToCharArray().Distinct());
		Console.WriteLine(newString);
	}
}
```

---

## Remove duplicate

```
using System;
public class Program
{
	public static void Main()
	{
		string key="mirajahhhh";
		string result ="";
		foreach(var value in key){
			if(result.IndexOf(value) == -1){
				result += value;
			}
		}
		Console.WriteLine(result);
	}
}
```

## Count Occurance using Dictionary

```
using System;
using System.Collections.Generic;
public class Program
{
	public static void Main()
	{

		string input = "example string";
        	Dictionary<char, int> charCount = new Dictionary<char, int>();

        foreach (char c in input)
        {
            if (charCount.ContainsKey(c))
            {
                charCount[c]++;
            }
            else
            {
                charCount[c] = 1;
            }
        }

        foreach (var item in charCount)
        {
            Console.WriteLine($"{item.Key}: {item.Value}");
        }
	}
}
```

## Count occurance

```
using System;

public class Program
{
	public static void Main()
	{
		string source ="miraaj";
		int count = 0;
		foreach (char c in source) 
  		if (c == 'a') count++;
		Console.WriteLine(count);
	}
}
```

```
using System;
using System.Collections.Generic;
using System.Linq;

public class Program
{
	public static void Main()
	{
		List<int> numbers = new List<int>{1,3,3,2,1};

		var occurances = numbers.GroupBy(x=>x)
			.Select(g => new{Number = g.Key, Count= g.Count()});

		foreach(var occ in occurances)
		{
			Console.WriteLine($"{occ.Number}={occ.Count}");
		}
	}
}
```

## Sum of digit

```
using System;

public class Program
{
	public static void Main()
	{
		int number = 123;
        int sum = 0;
        while (number > 0)
        {
            sum = sum+ number % 10;	 
            number =number/10;   
        }
        Console.WriteLine($"Sum of digits: {sum}");
	}
}
```

## Reverse digit

```
using System;

public class Program
{
	public static void Main()
	{
		int reversed = 0;
		int number = 12345;

        while (number > 0)
        {
            int digit = number % 10;       // Get the last digit
            reversed = reversed * 10 + digit;  // Append digit to reversed number
            number /= 10;                 // Remove the last digit
        }
        Console.WriteLine(reversed);
	}
}
```

## Factorial

```
if n = 0 return 1
else
return fact(n-1)*n
```

## Fibonacci

```
if n <= 1 return
else
return fib(n-1) + fib(n-1)
```

## Using string.Join

```
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        var list = new List<int> { 1, 2, 3, 4, 5 };

        // Print the list as a comma-separated string
        Console.WriteLine(string.Join(", ", list));
    }
}

```

## Reverse String

```
using System;

public class Program
{
	public static void Main()
	{
		string str = "miraaj";
		char[] charArray = str.ToCharArray(); 
  		for (int i = 0, j = str.Length - 1; i < j; i++, j--) 
  		{ 
      		charArray[i] = str[j]; 
      		charArray[j] = str[i]; 
  		} 
  		Console.WriteLine(charArray); 
	}
}
```

# Reverse an Array

```
using System;
	
public class Program
{
	public static void Main()
	{
		int[] ar=[9,1,2,3,4,4,];
		int[] ar1= new int[ar.Length];
		for(int i=0,j=ar.Length - 1;i<j;i++,j--){
			ar1[i]=ar[j];
			ar1[j]=ar[i];
		}
		Console.WriteLine(string.Join(", ", ar1));
	}
}
```

# Move zero at Last

```
using System;

public class Program
{
	public static void Main()
	{
	int[] A = { 5, 6, 0, 4, 6, 0, 9, 0, 8 }; 
        int n = A.Length; 
        int j = 0; 
        for (int i = 0; i < n; i++) { 
            if (A[i] != 0) { 
                int temp = A[j]; 
                A[j] = A[i]; 
                A[i] = temp; 
                j++; 
            } 
        } 
        for (int i = 0; i < n; i++) { 
            Console.WriteLine(A[i]); 
        } 
	}
}
```

# Check Big Letter

```
using System;
using System.Linq;

public class Program
{
	public static void Main()
	{
		string[] st= ["fox","ox","DOG"];
		var data = st.Any(x=>x.All(le => char.IsUpper(le)));
		Console.WriteLine(data);
	}
}
```

# Bubble Sort

```

using System;

public class Program
{
	public static void Main()
	{
		int[] arr =
		{
			800,
			11,
			50,
			771,
			649,
			770,
			240,
			9
		};
		int temp = 0;
		for (int i = 0; i < arr.Length; i++)
		{
			for (int j = 0; j < arr.Length - 1; j++)
			{
				if (arr[j] > arr[j + 1])
				{
					temp = arr[j];
					arr[j] = arr[j+1];
					arr[j+1] = temp;
				}
			}

			Console.Write("{0} ",arr[i]);
		}
	}
}
```

# Custom largest Number

```
using System;

public class Program
{
	public static void Main()
	{
		int[] ar=[9,1,2,3,4,4,];
		for(var i=0;i<ar.Length;i++){
		for(var j=0;j<ar.Length-1;j++){
			if(ar[j]<ar[j+1]){
				int temp=ar[j];
				ar[j]=ar[j+1];
				ar[j+1]=temp;
			}
		}
		}
		for(var i=0;i<ar.Length;i++){
		Console.WriteLine(ar[i]);
		}

		Console.Write("Enter your name: ");
		int name = Convert.ToInt32(Console.ReadLine());
		Console.WriteLine(ar[name-1]);
	}
}
```

# Largest Array Value

```
using System;

class Program
{
    static void Main()
    {
        int[] numbers = [ 5, 8, 2, 10, 3 ];
        int maxValue = numbers[0]; 

        foreach (int number in numbers)
        {
            if (number > maxValue)
            {
                maxValue = number;
            }
        }

        Console.WriteLine("The highest value is: " + maxValue);
    }
}

```

# Sum of Array

```
using System;

class Program
{
    static void Main()
    {
        int[] numbers = [ 3,4,6,4 ];
        int sum=0;

        foreach (int number in numbers)
        {
            sum+=number;
        }

        Console.WriteLine(sum);
    }
}
```

# Convert string into Array of Integers

```
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        string s="1,2,3,4";
		List<int> da = new List<int>();
		string[] stringArray = s.Split(',');

		foreach(var n in stringArray){
			int data = int.Parse(n);
			da.Add(data);
		}
		Console.WriteLine(string.Join(",", da));
    }
}

```

## Find the longest substring without repeating characters.

```
public class Solution {
    public int LongestSubstringWithoutRepeat(string s) {
        if (string.IsNullOrEmpty(s)) return 0;
    
        HashSet<char> seen = new HashSet<char>();
        int maxLength = 0;
        int start = 0;
    
        for (int end = 0; end < s.Length; end++) {
            // While we encounter a duplicate, shrink the window
            while (seen.Contains(s[end])) {
                seen.Remove(s[start]);
                start++;
            }
            // Add current character to the set
            seen.Add(s[end]);
            // Update maxLength if current window is larger
            maxLength = Math.Max(maxLength, end - start + 1);
        }
    
        return maxLength;
    }
}
```

## Valid Parenthesis

```
using System;
using System.Collections.Generic;

public class Program
{
    public static bool IsValid(string s)
    {
        Stack<char> stack = new Stack<char>();

        foreach (char c in s)
        {
            if (c == '(' || c == '{' || c == '[')
            {
                stack.Push(c);
            }
            else if (c == ')' || c == '}' || c == ']')
            {
                if (stack.Count == 0)
                    return false;

                char top = stack.Pop();
                if ((c == ')' && top != '(') ||
                    (c == '}' && top != '{') ||
                    (c == ']' && top != '['))
                    return false;
            }
        }

        return stack.Count == 0;
    }

    public static void Main()
    {
        string input = "({[]})";
        bool result = IsValid(input);
        Console.WriteLine($"Input: {input}");
        Console.WriteLine($"Is Valid: {result}");
    }
}
```

## Two Sum

```
public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        Dictionary<int, int> numToIndex = new Dictionary<int, int>();
    
        for (int i = 0; i < nums.Length; i++) {
            int complement = target - nums[i];
        
            if (numToIndex.ContainsKey(complement)) {
                return new int[] { numToIndex[complement], i };
            }
        
            numToIndex[nums[i]] = i;
        }
    
        return new int[0]; // Empty array if no solution (not reached due to problem guarantee)
    }
}
```

## Find the maximum subarray sum.

```
public class Solution {
    public int MaxSubarraySum(int[] nums) {
        if (nums == null || nums.Length == 0) {
            return 0;
        }
  
        int maxSum = nums[0];  // Initialize max sum with first element
        int currentSum = nums[0];  // Initialize current sum with first element
  
        for (int i = 1; i < nums.Length; i++) {
            // Decide whether to start new subarray or extend existing
            currentSum = Math.Max(nums[i], currentSum + nums[i]);
            // Update maxSum if currentSum is larger
            maxSum = Math.Max(maxSum, currentSum);
        }
  
        return maxSum;
    }
}
```

---

# C# Coding Interview Questions and Solutions

## Reverse words in a sentence without reversing each word

```csharp
using System;
using System.Linq;

public class Program
{
    public static string ReverseWords(string sentence)
    {
        if (string.IsNullOrWhiteSpace(sentence))
            return sentence;

        return string.Join(" ", sentence.Split(' ', StringSplitOptions.RemoveEmptyEntries).Reverse());
    }

    public static void Main()
    {
        string input = "I love CSharp programming";
        Console.WriteLine(ReverseWords(input));
        // Output: programming CSharp love I
    }
}
```

## Find the first non-repeating character

```csharp
using System;
using System.Collections.Generic;

public class Program
{
    public static char? FirstNonRepeatingChar(string input)
    {
        Dictionary<char, int> count = new Dictionary<char, int>();

        foreach (char c in input)
        {
            count[c] = count.ContainsKey(c) ? count[c] + 1 : 1;
        }

        foreach (char c in input)
        {
            if (count[c] == 1)
                return c;
        }

        return null;
    }

    public static void Main()
    {
        string input = "swiss";
        Console.WriteLine(FirstNonRepeatingChar(input));
        // Output: w
    }
}
```

## Check whether two strings are anagrams

```csharp
using System;
using System.Linq;

public class Program
{
    public static bool AreAnagrams(string first, string second)
    {
        if (first == null || second == null)
            return false;

        first = first.Replace(" ", "").ToLower();
        second = second.Replace(" ", "").ToLower();

        if (first.Length != second.Length)
            return false;

        return first.OrderBy(c => c).SequenceEqual(second.OrderBy(c => c));
    }

    public static void Main()
    {
        Console.WriteLine(AreAnagrams("listen", "silent"));
        // Output: True
    }
}
```

## Find duplicates in an integer array

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

public class Program
{
    public static List<int> FindDuplicates(int[] numbers)
    {
        HashSet<int> seen = new HashSet<int>();
        HashSet<int> duplicates = new HashSet<int>();

        foreach (int number in numbers)
        {
            if (!seen.Add(number))
                duplicates.Add(number);
        }

        return duplicates.ToList();
    }

    public static void Main()
    {
        int[] numbers = { 1, 2, 3, 2, 4, 5, 1 };
        Console.WriteLine(string.Join(", ", FindDuplicates(numbers)));
        // Output: 2, 1
    }
}
```

## Find the missing number

This solution assumes the array contains numbers from `1` to `n` with one number missing.

```csharp
using System;

public class Program
{
    public static int FindMissingNumber(int[] numbers, int n)
    {
        int expectedSum = n * (n + 1) / 2;
        int actualSum = 0;

        foreach (int number in numbers)
        {
            actualSum += number;
        }

        return expectedSum - actualSum;
    }

    public static void Main()
    {
        int[] numbers = { 1, 2, 4, 5, 6 };
        Console.WriteLine(FindMissingNumber(numbers, 6));
        // Output: 3
    }
}
```

## Move all zeroes to the end

```csharp
using System;

public class Program
{
    public static void MoveZeroesToEnd(int[] numbers)
    {
        int insertPosition = 0;

        for (int i = 0; i < numbers.Length; i++)
        {
            if (numbers[i] != 0)
            {
                numbers[insertPosition] = numbers[i];
                insertPosition++;
            }
        }

        while (insertPosition < numbers.Length)
        {
            numbers[insertPosition] = 0;
            insertPosition++;
        }
    }

    public static void Main()
    {
        int[] numbers = { 0, 1, 0, 3, 12 };
        MoveZeroesToEnd(numbers);
        Console.WriteLine(string.Join(", ", numbers));
        // Output: 1, 3, 12, 0, 0
    }
}
```

## Find the longest substring without repeating characters

```csharp
using System;
using System.Collections.Generic;

public class Program
{
    public static string LongestSubstringWithoutRepeatingChars(string input)
    {
        Dictionary<char, int> lastSeen = new Dictionary<char, int>();
        int start = 0;
        int maxLength = 0;
        int maxStart = 0;

        for (int end = 0; end < input.Length; end++)
        {
            char current = input[end];

            if (lastSeen.ContainsKey(current) && lastSeen[current] >= start)
            {
                start = lastSeen[current] + 1;
            }

            lastSeen[current] = end;

            int currentLength = end - start + 1;
            if (currentLength > maxLength)
            {
                maxLength = currentLength;
                maxStart = start;
            }
        }

        return input.Substring(maxStart, maxLength);
    }

    public static void Main()
    {
        string input = "abcabcbb";
        Console.WriteLine(LongestSubstringWithoutRepeatingChars(input));
        // Output: abc
    }
}
```
