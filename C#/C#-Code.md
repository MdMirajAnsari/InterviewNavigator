## Reverse a String

```csharp
public string ReverseString(string s)
{
    if (string.IsNullOrEmpty(s)) return s;
    char[] chars = s.ToCharArray();
    int left = 0, right = s.Length - 1;
    while (left < right)
    {
        char temp = chars[left];
        chars[left++] = chars[right];
        chars[right--] = temp;
    }
    return new string(chars);
}
```

## Check if a String is a Palindrome

```csharp
public bool IsPalindrome(string s)
{
    if (string.IsNullOrEmpty(s)) return true;
    s = s.ToLower().Replace(" ", "").Where(char.IsLetterOrDigit).Aggregate("", (current, c) => current + c);
    int left = 0, right = s.Length - 1;
    while (left < right)
    {
        if (s[left++] != s[right--]) return false;
    }
    return true;
}
```

## Find the First Non-Repeating Character in a String

```csharp
public char FirstNonRepeatingChar(string s)
{
    Dictionary<char, int> charCount = new Dictionary<char, int>();
    foreach (char c in s)
    {
        charCount[c] = charCount.GetValueOrDefault(c, 0) + 1;
    }
    foreach (char c in s)
    {
        if (charCount[c] == 1) return c;
    }
    throw new InvalidOperationException("No non-repeating character found.");
}
```

## Find Duplicates in an Array

```csharp
public List<int> FindDuplicates(int[] nums)
{
    HashSet<int> seen = new HashSet<int>();
    List<int> duplicates = new List<int>();
    foreach (int num in nums)
    {
        if (!seen.Add(num))
        {
            duplicates.Add(num);
        }
    }
    return duplicates;
}
```

## **Reverse words in a sentence** .

## Remove all white spaces from a string

```csharp
using System.Text.RegularExpressions;

string input = "Hello \t World \n From  C#";
string result = Regex.Replace(input, @"\s+", "");
Console.WriteLine(result);  // Output: HelloWorldFromC#

```

## Find Occurance in string and Array

```csharp
using System;
using System.Linq;

class Program
{
    static void Main()
    {
        int[] numbers = { 1, 2, 3, 2, 4, 2, 5 };

    var frequency = numbers.GroupBy(n => n)
                               .ToDictionary(g => g.Key, g => g.Count());

    foreach (var kvp in frequency)
        {
            Console.WriteLine($"{kvp.Key} occurs {kvp.Value} times");
        }
    }
}
```

## **Find 2nd highest (or nth highest) number in an array** .

```csharp
using System;

class Program
{
    static void Main()
    {
        int[] arr = { 10, 5, 20, 8, 20 };
        int highest = int.MinValue;
        int secondHighest = int.MinValue;

        foreach(var num in arr)
        {
            if(num > highest)
            {
                secondHighest = highest;
                highest = num;
            }
            else if(num > secondHighest && num != highest)
            {
                secondHighest = num;
            }
        }

        Console.WriteLine("2nd Highest: " + secondHighest);
    }
}

```

## String sort

```csharp
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

```csharp
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

```csharp
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

---

## Remove duplicate

```csharp
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

## Another Approach

```csharp
using System;
using System.Collections.Generic;

public class Program
{
    public static void Main()
    {
        int[] numbers = { 1, 2, 3, 2, 4, 1, 5, 3 };
        List<int> result = new List<int>();

        foreach (var num in numbers)
        {
            if (!result.Contains(num)) // same idea as your IndexOf check
            {
                result.Add(num);
            }
        }

        Console.WriteLine(string.Join(", ", result));
    }
}

```

## Count Occurance using Dictionary

```csharp
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

```csharp
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

```csharp
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

```csharp
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

```csharp
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

## Reverse an Array

```csharp
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

## Move zero at Last

```csharp
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

## Check Big Letter

```csharp
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

## Bubble Sort

```csharp

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

## Custom largest Number

```csharp
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

## Largest Array Value

```csharp
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

## Sum of Array

```csharp
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

## Convert string into Array of Integers

```csharp
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

```csharp
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

```csharp
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

```csharp
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

```csharp
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

## **Async/Await Method with Error Handling**

```csharp
public async Task<string> FetchDataAsync(string url)
{
    try
    {
        using HttpClient client = new HttpClient();
        HttpResponseMessage response = await client.GetAsync(url);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
    }
    catch (HttpRequestException ex)
    {
        Console.WriteLine($"Request failed: {ex.Message}");
        throw;
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Unexpected error: {ex.Message}");
        throw;
    }
}
```

## Implement a Singleton Pattern

```csharp
public sealed class Singleton
{
    private static readonly Lazy<Singleton> instance = new Lazy<Singleton>(() => new Singleton(), true);
    private Singleton() { }
    public static Singleton Instance => instance.Value;
}
```
