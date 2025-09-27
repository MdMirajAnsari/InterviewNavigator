# Data Structure Code Examples

## Reverse a linked list

```c#
using System;

class Node
{
    public int Data;
    public Node Next;

    public Node(int data)
    {
        Data = data;
        Next = null;
    }
}

class LinkedList
{
    private Node head;

    // Add a new node to the end of the list
    public void Add(int data)
    {
        Node newNode = new Node(data);
        if (head == null)
        {
            head = newNode;
        }
        else
        {
            Node current = head;
            while (current.Next != null)
            {
                current = current.Next;
            }
            current.Next = newNode;
        }
    }

    // Reverse the linked list
    public void Reverse()
    {
        Node previous = null;
        Node current = head;
        Node next = null;

        while (current != null)
        {
            next = current.Next; // Store the next node
            current.Next = previous; // Reverse the link
            previous = current; // Move previous to current
            current = next; // Move current to next
        }

        head = previous; // Update the head
    }

    // Print the linked list
    public void PrintList()
    {
        Node current = head;
        while (current != null)
        {
            Console.Write(current.Data + " ");
            current = current.Next;
        }
        Console.WriteLine();
    }
}

class Program
{
    static void Main(string[] args)
    {
        LinkedList list = new LinkedList();

        // Add elements to the linked list
        list.Add(1);
        list.Add(2);
        list.Add(3);
        list.Add(4);
        list.Add(5);

        Console.WriteLine("Original List:");
        list.PrintList();

        // Reverse the linked list
        list.Reverse();

        Console.WriteLine("Reversed List:");
        list.PrintList();
    }
}

```

## 3sum

```c#
public class Solution {
    public IList<IList<int>> ThreeSum(int[] nums) {
        List<IList<int>> result = new List<IList<int>>();
        if (nums == null || nums.Length < 3) return result;
  
        // Sort the array first
        Array.Sort(nums);
  
        // Iterate through array, fixing first number
        for (int i = 0; i < nums.Length - 2; i++) {
            // Skip duplicates for first number
            if (i > 0 && nums[i] == nums[i-1]) continue;
      
            // Use two pointers for remaining numbers
            int left = i + 1;
            int right = nums.Length - 1;
      
            while (left < right) { // Fixed: changed 'toggleright' to 'left < right'
                int sum = nums[i] + nums[left] + nums[right];
          
                if (sum == 0) {
                    // Found a valid triplet
                    result.Add(new List<int> { nums[i], nums[left], nums[right] });
              
                    // Skip duplicates for left pointer
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    // Skip duplicates for right pointer
                    while (left < right && nums[right] == nums[right - 1]) right--;
              
                    left++;
                    right--;
                }
                else if (sum < 0) {
                    // Sum too small, increment left pointer
                    left++;
                }
                else {
                    // Sum too large, decrement right pointer
                    right--;
                }
            }
        }
  
        return result;
    }
}
```

## Valid Parenthesis

```c#

public class Solution {
    public bool IsValid(string s) {
     Stack<char> stack = new Stack<char>();
  
        foreach (char c in s) {
            if (c == '(' || c == '{' || c == '[') {
                stack.Push(c);
            } else {
                if (stack.Count == 0) return false;
          
                char top = stack.Pop();
                if ((c == ')' && top != '(') || 
                    (c == '}' && top != '{') || 
                    (c == ']' && top != '[')) {
                    return false;
                }
            }
        }
  
        return stack.Count == 0;
}}
```

## Detect a cycle in a linked list

```c#
public class Solution {
    public bool HasCycle(ListNode head) {
        if (head == null || head.next == null) return false;
        
        ListNode slow = head;
        ListNode fast = head.next;
        
        while (fast != null && fast.next != null) {
            if (slow == fast) return true;
            slow = slow.next;
            fast = fast.next.next;
        }
        
        return false;
    }
}

// Alternative approach using HashSet
public class Solution {
    public bool HasCycle(ListNode head) {
        HashSet<ListNode> visited = new HashSet<ListNode>();
        
        while (head != null) {
            if (visited.Contains(head)) {
                return true;
            }
            visited.Add(head);
            head = head.next;
        }
        
        return false;
    }
}
```

## Merge two sorted linked lists

```c#
public class Solution {
    public ListNode MergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                current.next = list1;
                list1 = list1.next;
            } else {
                current.next = list2;
                list2 = list2.next;
            }
            current = current.next;
        }
        
        // Attach remaining nodes
        current.next = list1 ?? list2;
        
        return dummy.next;
    }
}

// Recursive approach
public class Solution {
    public ListNode MergeTwoLists(ListNode list1, ListNode list2) {
        if (list1 == null) return list2;
        if (list2 == null) return list1;
        
        if (list1.val <= list2.val) {
            list1.next = MergeTwoLists(list1.next, list2);
            return list1;
        } else {
            list2.next = MergeTwoLists(list1, list2.next);
            return list2;
        }
    }
}
```

## Find the middle of a linked list

```c#
public class Solution {
    public ListNode MiddleNode(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        return slow;
    }
}

// Alternative: Find middle with even/odd handling
public class Solution {
    public ListNode MiddleNode(ListNode head) {
        if (head == null) return null;
        
        ListNode slow = head;
        ListNode fast = head;
        
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        return slow;
    }
}
```

## Find intersection point of two linked lists

```c#
public class Solution {
    public ListNode GetIntersectionNode(ListNode headA, ListNode headB) {
        if (headA == null || headB == null) return null;
        
        ListNode a = headA;
        ListNode b = headB;
        
        // When a reaches end, redirect to headB
        // When b reaches end, redirect to headA
        // This makes both pointers traverse the same distance
        while (a != b) {
            a = a == null ? headB : a.next;
            b = b == null ? headA : b.next;
        }
        
        return a;
    }
}

// Alternative approach using length difference
public class Solution {
    public ListNode GetIntersectionNode(ListNode headA, ListNode headB) {
        int lenA = GetLength(headA);
        int lenB = GetLength(headB);
        
        // Move the longer list forward by the difference
        while (lenA > lenB) {
            headA = headA.next;
            lenA--;
        }
        
        while (lenB > lenA) {
            headB = headB.next;
            lenB--;
        }
        
        // Now both lists are at the same position
        while (headA != headB) {
            headA = headA.next;
            headB = headB.next;
        }
        
        return headA;
    }
    
    private int GetLength(ListNode head) {
        int length = 0;
        while (head != null) {
            length++;
            head = head.next;
        }
        return length;
    }
}
```

## Implement a stack using queues

```c#
public class MyStack {
    private Queue<int> queue1;
    private Queue<int> queue2;
    
    public MyStack() {
        queue1 = new Queue<int>();
        queue2 = new Queue<int>();
    }
    
    public void Push(int x) {
        queue2.Enqueue(x);
        
        // Move all elements from queue1 to queue2
        while (queue1.Count > 0) {
            queue2.Enqueue(queue1.Dequeue());
        }
        
        // Swap the queues
        var temp = queue1;
        queue1 = queue2;
        queue2 = temp;
    }
    
    public int Pop() {
        return queue1.Dequeue();
    }
    
    public int Top() {
        return queue1.Peek();
    }
    
    public bool Empty() {
        return queue1.Count == 0;
    }
}

// Alternative: Using single queue
public class MyStack {
    private Queue<int> queue;
    
    public MyStack() {
        queue = new Queue<int>();
    }
    
    public void Push(int x) {
        queue.Enqueue(x);
        
        // Rotate the queue to make the new element at front
        for (int i = 0; i < queue.Count - 1; i++) {
            queue.Enqueue(queue.Dequeue());
        }
    }
    
    public int Pop() {
        return queue.Dequeue();
    }
    
    public int Top() {
        return queue.Peek();
    }
    
    public bool Empty() {
        return queue.Count == 0;
    }
}
```

## Implement a queue using stacks

```c#
public class MyQueue {
    private Stack<int> stack1; // For enqueue
    private Stack<int> stack2; // For dequeue
    
    public MyQueue() {
        stack1 = new Stack<int>();
        stack2 = new Stack<int>();
    }
    
    public void Push(int x) {
        stack1.Push(x);
    }
    
    public int Pop() {
        if (stack2.Count == 0) {
            // Move all elements from stack1 to stack2
            while (stack1.Count > 0) {
                stack2.Push(stack1.Pop());
            }
        }
        return stack2.Pop();
    }
    
    public int Peek() {
        if (stack2.Count == 0) {
            // Move all elements from stack1 to stack2
            while (stack1.Count > 0) {
                stack2.Push(stack1.Pop());
            }
        }
        return stack2.Peek();
    }
    
    public bool Empty() {
        return stack1.Count == 0 && stack2.Count == 0;
    }
}
```

## Check for balanced parentheses

```c#
public class Solution {
    public bool IsValid(string s) {
        Stack<char> stack = new Stack<char>();
        
        foreach (char c in s) {
            if (c == '(' || c == '{' || c == '[') {
                stack.Push(c);
            } else {
                if (stack.Count == 0) return false;
                
                char top = stack.Pop();
                if ((c == ')' && top != '(') || 
                    (c == '}' && top != '{') || 
                    (c == ']' && top != '[')) {
                    return false;
                }
            }
        }
        
        return stack.Count == 0;
    }
}

// Alternative: Using dictionary for mapping
public class Solution {
    public bool IsValid(string s) {
        Stack<char> stack = new Stack<char>();
        Dictionary<char, char> mapping = new Dictionary<char, char> {
            {')', '('},
            {'}', '{'},
            {']', '['}
        };
        
        foreach (char c in s) {
            if (mapping.ContainsKey(c)) {
                // Closing bracket
                if (stack.Count == 0 || stack.Pop() != mapping[c]) {
                    return false;
                }
            } else {
                // Opening bracket
                stack.Push(c);
            }
        }
        
        return stack.Count == 0;
    }
}
```

## Find the first non-repeating character in a string

```c#
public class Solution {
    public int FirstUniqChar(string s) {
        Dictionary<char, int> charCount = new Dictionary<char, int>();
        
        // Count frequency of each character
        foreach (char c in s) {
            if (charCount.ContainsKey(c)) {
                charCount[c]++;
            } else {
                charCount[c] = 1;
            }
        }
        
        // Find first character with count 1
        for (int i = 0; i < s.Length; i++) {
            if (charCount[s[i]] == 1) {
                return i;
            }
        }
        
        return -1;
    }
}

// Alternative: Using array for better performance
public class Solution {
    public int FirstUniqChar(string s) {
        int[] charCount = new int[26]; // Assuming lowercase letters only
        
        // Count frequency
        foreach (char c in s) {
            charCount[c - 'a']++;
        }
        
        // Find first unique character
        for (int i = 0; i < s.Length; i++) {
            if (charCount[s[i] - 'a'] == 1) {
                return i;
            }
        }
        
        return -1;
    }
}
```

## Check if a string is a palindrome

```c#
// Basic palindrome check
public class Solution {
    public bool IsPalindrome(string s) {
        int left = 0;
        int right = s.Length - 1;
        
        while (left < right) {
            if (s[left] != s[right]) {
                return false;
            }
            left++;
            right--;
        }
        
        return true;
    }
}

// Palindrome ignoring spaces and case
public class Solution {
    public bool IsPalindrome(string s) {
        int left = 0;
        int right = s.Length - 1;
        
        while (left < right) {
            // Skip non-alphanumeric characters from left
            while (left < right && !char.IsLetterOrDigit(s[left])) {
                left++;
            }
            
            // Skip non-alphanumeric characters from right
            while (left < right && !char.IsLetterOrDigit(s[right])) {
                right--;
            }
            
            if (char.ToLower(s[left]) != char.ToLower(s[right])) {
                return false;
            }
            
            left++;
            right--;
        }
        
        return true;
    }
}

// Palindrome with alphanumeric only
public class Solution {
    public bool IsPalindrome(string s) {
        // Remove all non-alphanumeric characters and convert to lowercase
        string cleaned = "";
        foreach (char c in s) {
            if (char.IsLetterOrDigit(c)) {
                cleaned += char.ToLower(c);
            }
        }
        
        int left = 0;
        int right = cleaned.Length - 1;
        
        while (left < right) {
            if (cleaned[left] != cleaned[right]) {
                return false;
            }
            left++;
            right--;
        }
        
        return true;
    }
}
```

## Longest substring without repeating characters

```c#
public class Solution {
    public int LengthOfLongestSubstring(string s) {
        if (string.IsNullOrEmpty(s)) return 0;
        
        Dictionary<char, int> charIndex = new Dictionary<char, int>();
        int maxLength = 0;
        int start = 0;
        
        for (int end = 0; end < s.Length; end++) {
            if (charIndex.ContainsKey(s[end]) && charIndex[s[end]] >= start) {
                start = charIndex[s[end]] + 1;
            }
            
            charIndex[s[end]] = end;
            maxLength = Math.Max(maxLength, end - start + 1);
        }
        
        return maxLength;
    }
}

// Alternative: Using HashSet
public class Solution {
    public int LengthOfLongestSubstring(string s) {
        if (string.IsNullOrEmpty(s)) return 0;
        
        HashSet<char> charSet = new HashSet<char>();
        int maxLength = 0;
        int left = 0;
        
        for (int right = 0; right < s.Length; right++) {
            while (charSet.Contains(s[right])) {
                charSet.Remove(s[left]);
                left++;
            }
            
            charSet.Add(s[right]);
            maxLength = Math.Max(maxLength, right - left + 1);
        }
        
        return maxLength;
    }
}
```

## Find the longest palindromic substring

```c#
public class Solution {
    public string LongestPalindrome(string s) {
        if (string.IsNullOrEmpty(s)) return "";
        
        int start = 0;
        int maxLength = 1;
        
        for (int i = 0; i < s.Length; i++) {
            // Check for odd length palindromes
            int len1 = ExpandAroundCenter(s, i, i);
            // Check for even length palindromes
            int len2 = ExpandAroundCenter(s, i, i + 1);
            
            int len = Math.Max(len1, len2);
            
            if (len > maxLength) {
                start = i - (len - 1) / 2;
                maxLength = len;
            }
        }
        
        return s.Substring(start, maxLength);
    }
    
    private int ExpandAroundCenter(string s, int left, int right) {
        while (left >= 0 && right < s.Length && s[left] == s[right]) {
            left--;
            right++;
        }
        return right - left - 1;
    }
}

// Alternative: Dynamic Programming approach
public class Solution {
    public string LongestPalindrome(string s) {
        if (string.IsNullOrEmpty(s)) return "";
        
        int n = s.Length;
        bool[,] dp = new bool[n, n];
        int start = 0;
        int maxLength = 1;
        
        // Every single character is a palindrome
        for (int i = 0; i < n; i++) {
            dp[i, i] = true;
        }
        
        // Check for palindromes of length 2
        for (int i = 0; i < n - 1; i++) {
            if (s[i] == s[i + 1]) {
                dp[i, i + 1] = true;
                start = i;
                maxLength = 2;
            }
        }
        
        // Check for palindromes of length 3 and more
        for (int length = 3; length <= n; length++) {
            for (int i = 0; i < n - length + 1; i++) {
                int j = i + length - 1;
                
                if (s[i] == s[j] && dp[i + 1, j - 1]) {
                    dp[i, j] = true;
                    if (length > maxLength) {
                        start = i;
                        maxLength = length;
                    }
                }
            }
        }
        
        return s.Substring(start, maxLength);
    }
}
```

## Implement binary search

```c#
// Iterative binary search
public class Solution {
    public int Search(int[] nums, int target) {
        int left = 0;
        int right = nums.Length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1;
    }
}

// Recursive binary search
public class Solution {
    public int Search(int[] nums, int target) {
        return BinarySearch(nums, target, 0, nums.Length - 1);
    }
    
    private int BinarySearch(int[] nums, int target, int left, int right) {
        if (left > right) return -1;
        
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            return BinarySearch(nums, target, mid + 1, right);
        } else {
            return BinarySearch(nums, target, left, mid - 1);
        }
    }
}
```

## Find the square root of a number

```c#
public class Solution {
    public int MySqrt(int x) {
        if (x < 2) return x;
        
        int left = 2;
        int right = x / 2;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            long square = (long)mid * mid;
            
            if (square == x) {
                return mid;
            } else if (square < x) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return right;
    }
}

// Alternative: Newton's method
public class Solution {
    public int MySqrt(int x) {
        if (x < 2) return x;
        
        long r = x;
        while (r * r > x) {
            r = (r + x / r) / 2;
        }
        
        return (int)r;
    }
}
```

## Search in a rotated sorted array

```c#
public class Solution {
    public int Search(int[] nums, int target) {
        int left = 0;
        int right = nums.Length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] == target) {
                return mid;
            }
            
            // Check which half is sorted
            if (nums[left] <= nums[mid]) {
                // Left half is sorted
                if (target >= nums[left] && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                // Right half is sorted
                if (target > nums[mid] && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        
        return -1;
    }
}
```

## Find the kth largest element in an array

```c#
// Using QuickSelect algorithm
public class Solution {
    public int FindKthLargest(int[] nums, int k) {
        return QuickSelect(nums, 0, nums.Length - 1, nums.Length - k);
    }
    
    private int QuickSelect(int[] nums, int left, int right, int k) {
        if (left == right) return nums[left];
        
        int pivotIndex = Partition(nums, left, right);
        
        if (k == pivotIndex) {
            return nums[k];
        } else if (k < pivotIndex) {
            return QuickSelect(nums, left, pivotIndex - 1, k);
        } else {
            return QuickSelect(nums, pivotIndex + 1, right, k);
        }
    }
    
    private int Partition(int[] nums, int left, int right) {
        int pivot = nums[right];
        int i = left;
        
        for (int j = left; j < right; j++) {
            if (nums[j] <= pivot) {
                Swap(nums, i, j);
                i++;
            }
        }
        
        Swap(nums, i, right);
        return i;
    }
    
    private void Swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}

// Alternative: Using MinHeap
public class Solution {
    public int FindKthLargest(int[] nums, int k) {
        PriorityQueue<int, int> minHeap = new PriorityQueue<int, int>();
        
        foreach (int num in nums) {
            minHeap.Enqueue(num, num);
            
            if (minHeap.Count > k) {
                minHeap.Dequeue();
            }
        }
        
        return minHeap.Peek();
    }
}
```

## Maximum subarray sum (Kadane's algorithm)

```c#
public class Solution {
    public int MaxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int maxEndingHere = nums[0];
        
        for (int i = 1; i < nums.Length; i++) {
            maxEndingHere = Math.Max(nums[i], maxEndingHere + nums[i]);
            maxSoFar = Math.Max(maxSoFar, maxEndingHere);
        }
        
        return maxSoFar;
    }
}

// Alternative: With indices tracking
public class Solution {
    public int MaxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int maxEndingHere = nums[0];
        int start = 0, end = 0, tempStart = 0;
        
        for (int i = 1; i < nums.Length; i++) {
            if (maxEndingHere < 0) {
                maxEndingHere = nums[i];
                tempStart = i;
            } else {
                maxEndingHere += nums[i];
            }
            
            if (maxEndingHere > maxSoFar) {
                maxSoFar = maxEndingHere;
                start = tempStart;
                end = i;
            }
        }
        
        return maxSoFar;
    }
}
```

## Trapping rainwater problem

```c#
public class Solution {
    public int Trap(int[] height) {
        if (height == null || height.Length < 3) return 0;
        
        int left = 0, right = height.Length - 1;
        int leftMax = 0, rightMax = 0;
        int water = 0;
        
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    water += leftMax - height[left];
                }
                left++;
            } else {
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    water += rightMax - height[right];
                }
                right--;
            }
        }
        
        return water;
    }
}

// Alternative: Using arrays to store max heights
public class Solution {
    public int Trap(int[] height) {
        if (height == null || height.Length < 3) return 0;
        
        int n = height.Length;
        int[] leftMax = new int[n];
        int[] rightMax = new int[n];
        
        // Calculate left max for each position
        leftMax[0] = height[0];
        for (int i = 1; i < n; i++) {
            leftMax[i] = Math.Max(leftMax[i - 1], height[i]);
        }
        
        // Calculate right max for each position
        rightMax[n - 1] = height[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            rightMax[i] = Math.Max(rightMax[i + 1], height[i]);
        }
        
        // Calculate trapped water
        int water = 0;
        for (int i = 0; i < n; i++) {
            water += Math.Min(leftMax[i], rightMax[i]) - height[i];
        }
        
        return water;
    }
}
```

## Container with most water

```c#
public class Solution {
    public int MaxArea(int[] height) {
        int left = 0;
        int right = height.Length - 1;
        int maxArea = 0;
        
        while (left < right) {
            int width = right - left;
            int minHeight = Math.Min(height[left], height[right]);
            int area = width * minHeight;
            maxArea = Math.Max(maxArea, area);
            
            // Move the pointer with smaller height
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        
        return maxArea;
    }
}
```

## Two-sum problem and its variations

```c#
// Basic Two Sum
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
        
        return new int[0];
    }
}

// Two Sum II - Input array is sorted
public class Solution {
    public int[] TwoSum(int[] numbers, int target) {
        int left = 0;
        int right = numbers.Length - 1;
        
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            
            if (sum == target) {
                return new int[] { left + 1, right + 1 }; // 1-indexed
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        
        return new int[0];
    }
}

// Three Sum (already exists in the file, but here's an alternative)
public class Solution {
    public IList<IList<int>> ThreeSum(int[] nums) {
        List<IList<int>> result = new List<IList<int>>();
        if (nums == null || nums.Length < 3) return result;
        
        Array.Sort(nums);
        
        for (int i = 0; i < nums.Length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue; // Skip duplicates
            
            int left = i + 1;
            int right = nums.Length - 1;
            
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                
                if (sum == 0) {
                    result.Add(new List<int> { nums[i], nums[left], nums[right] });
                    
                    // Skip duplicates
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    
                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        
        return result;
    }
}
```

## Lowest common ancestor in a binary search tree

```c#
public class Solution {
    public TreeNode LowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        while (root != null) {
            if (p.val < root.val && q.val < root.val) {
                // Both nodes are in left subtree
                root = root.left;
            } else if (p.val > root.val && q.val > root.val) {
                // Both nodes are in right subtree
                root = root.right;
            } else {
                // Found the LCA
                return root;
            }
        }
        return null;
    }
}

// Recursive approach
public class Solution {
    public TreeNode LowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null) return null;
        
        if (p.val < root.val && q.val < root.val) {
            return LowestCommonAncestor(root.left, p, q);
        } else if (p.val > root.val && q.val > root.val) {
            return LowestCommonAncestor(root.right, p, q);
        } else {
            return root;
        }
    }
}
```

## Level order traversal of a binary tree

```c#
public class Solution {
    public IList<IList<int>> LevelOrder(TreeNode root) {
        List<IList<int>> result = new List<IList<int>>();
        if (root == null) return result;
        
        Queue<TreeNode> queue = new Queue<TreeNode>();
        queue.Enqueue(root);
        
        while (queue.Count > 0) {
            int levelSize = queue.Count;
            List<int> currentLevel = new List<int>();
            
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.Dequeue();
                currentLevel.Add(node.val);
                
                if (node.left != null) queue.Enqueue(node.left);
                if (node.right != null) queue.Enqueue(node.right);
            }
            
            result.Add(currentLevel);
        }
        
        return result;
    }
}

// Alternative: Using List<List<TreeNode>>
public class Solution {
    public IList<IList<int>> LevelOrder(TreeNode root) {
        List<IList<int>> result = new List<IList<int>>();
        if (root == null) return result;
        
        List<TreeNode> currentLevel = new List<TreeNode> { root };
        
        while (currentLevel.Count > 0) {
            List<int> levelValues = new List<int>();
            List<TreeNode> nextLevel = new List<TreeNode>();
            
            foreach (TreeNode node in currentLevel) {
                levelValues.Add(node.val);
                
                if (node.left != null) nextLevel.Add(node.left);
                if (node.right != null) nextLevel.Add(node.right);
            }
            
            result.Add(levelValues);
            currentLevel = nextLevel;
        }
        
        return result;
    }
}
```

## Validate if a binary tree is a BST

```c#
public class Solution {
    public bool IsValidBST(TreeNode root) {
        return IsValidBST(root, null, null);
    }
    
    private bool IsValidBST(TreeNode node, int? min, int? max) {
        if (node == null) return true;
        
        if ((min != null && node.val <= min) || (max != null && node.val >= max)) {
            return false;
        }
        
        return IsValidBST(node.left, min, node.val) && 
               IsValidBST(node.right, node.val, max);
    }
}

// Alternative: Using inorder traversal
public class Solution {
    private TreeNode prev = null;
    
    public bool IsValidBST(TreeNode root) {
        return InorderTraversal(root);
    }
    
    private bool InorderTraversal(TreeNode node) {
        if (node == null) return true;
        
        if (!InorderTraversal(node.left)) return false;
        
        if (prev != null && node.val <= prev.val) return false;
        prev = node;
        
        return InorderTraversal(node.right);
    }
}

// Alternative: Using iterative inorder traversal
public class Solution {
    public bool IsValidBST(TreeNode root) {
        Stack<TreeNode> stack = new Stack<TreeNode>();
        TreeNode prev = null;
        
        while (stack.Count > 0 || root != null) {
            while (root != null) {
                stack.Push(root);
                root = root.left;
            }
            
            root = stack.Pop();
            
            if (prev != null && root.val <= prev.val) {
                return false;
            }
            
            prev = root;
            root = root.right;
        }
        
        return true;
    }
}
```

## Implement BFS and DFS for graphs

```c#
// BFS Implementation
public class GraphBFS {
    private int vertices;
    private List<int>[] adjacencyList;
    
    public GraphBFS(int vertices) {
        this.vertices = vertices;
        adjacencyList = new List<int>[vertices];
        for (int i = 0; i < vertices; i++) {
            adjacencyList[i] = new List<int>();
        }
    }
    
    public void AddEdge(int source, int destination) {
        adjacencyList[source].Add(destination);
    }
    
    public void BFS(int startVertex) {
        bool[] visited = new bool[vertices];
        Queue<int> queue = new Queue<int>();
        
        visited[startVertex] = true;
        queue.Enqueue(startVertex);
        
        while (queue.Count > 0) {
            int currentVertex = queue.Dequeue();
            Console.Write(currentVertex + " ");
            
            foreach (int neighbor in adjacencyList[currentVertex]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.Enqueue(neighbor);
                }
            }
        }
    }
}

// DFS Implementation
public class GraphDFS {
    private int vertices;
    private List<int>[] adjacencyList;
    
    public GraphDFS(int vertices) {
        this.vertices = vertices;
        adjacencyList = new List<int>[vertices];
        for (int i = 0; i < vertices; i++) {
            adjacencyList[i] = new List<int>();
        }
    }
    
    public void AddEdge(int source, int destination) {
        adjacencyList[source].Add(destination);
    }
    
    public void DFS(int startVertex) {
        bool[] visited = new bool[vertices];
        DFSUtil(startVertex, visited);
    }
    
    private void DFSUtil(int vertex, bool[] visited) {
        visited[vertex] = true;
        Console.Write(vertex + " ");
        
        foreach (int neighbor in adjacencyList[vertex]) {
            if (!visited[neighbor]) {
                DFSUtil(neighbor, visited);
            }
        }
    }
    
    // Iterative DFS using Stack
    public void DFSIterative(int startVertex) {
        bool[] visited = new bool[vertices];
        Stack<int> stack = new Stack<int>();
        
        stack.Push(startVertex);
        
        while (stack.Count > 0) {
            int currentVertex = stack.Pop();
            
            if (!visited[currentVertex]) {
                visited[currentVertex] = true;
                Console.Write(currentVertex + " ");
                
                // Push neighbors in reverse order to maintain left-to-right traversal
                for (int i = adjacencyList[currentVertex].Count - 1; i >= 0; i--) {
                    int neighbor = adjacencyList[currentVertex][i];
                    if (!visited[neighbor]) {
                        stack.Push(neighbor);
                    }
                }
            }
        }
    }
}
```

## Detect a cycle in a directed graph

```c#
public class Solution {
    public bool HasCycle(int numCourses, int[][] prerequisites) {
        // Build adjacency list
        List<int>[] graph = new List<int>[numCourses];
        for (int i = 0; i < numCourses; i++) {
            graph[i] = new List<int>();
        }
        
        foreach (int[] edge in prerequisites) {
            graph[edge[1]].Add(edge[0]);
        }
        
        // 0: unvisited, 1: visiting, 2: visited
        int[] state = new int[numCourses];
        
        for (int i = 0; i < numCourses; i++) {
            if (state[i] == 0 && HasCycleDFS(graph, i, state)) {
                return true;
            }
        }
        
        return false;
    }
    
    private bool HasCycleDFS(List<int>[] graph, int node, int[] state) {
        if (state[node] == 1) return true; // Cycle detected
        if (state[node] == 2) return false; // Already processed
        
        state[node] = 1; // Mark as visiting
        
        foreach (int neighbor in graph[node]) {
            if (HasCycleDFS(graph, neighbor, state)) {
                return true;
            }
        }
        
        state[node] = 2; // Mark as visited
        return false;
    }
}

// Alternative: Using colors (White, Gray, Black)
public class Solution {
    private enum Color { White, Gray, Black }
    
    public bool HasCycle(int numCourses, int[][] prerequisites) {
        List<int>[] graph = new List<int>[numCourses];
        for (int i = 0; i < numCourses; i++) {
            graph[i] = new List<int>();
        }
        
        foreach (int[] edge in prerequisites) {
            graph[edge[1]].Add(edge[0]);
        }
        
        Color[] colors = new Color[numCourses];
        
        for (int i = 0; i < numCourses; i++) {
            if (colors[i] == Color.White && HasCycleDFS(graph, i, colors)) {
                return true;
            }
        }
        
        return false;
    }
    
    private bool HasCycleDFS(List<int>[] graph, int node, Color[] colors) {
        if (colors[node] == Color.Gray) return true; // Back edge found
        
        colors[node] = Color.Gray;
        
        foreach (int neighbor in graph[node]) {
            if (HasCycleDFS(graph, neighbor, colors)) {
                return true;
            }
        }
        
        colors[node] = Color.Black;
        return false;
    }
}
```

## Implement an LRU cache

```c#
public class LRUCache {
    private int capacity;
    private Dictionary<int, DLinkedNode> cache;
    private DLinkedNode head;
    private DLinkedNode tail;
    
    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new Dictionary<int, DLinkedNode>();
        
        // Create dummy head and tail nodes
        this.head = new DLinkedNode();
        this.tail = new DLinkedNode();
        head.next = tail;
        tail.prev = head;
    }
    
    public int Get(int key) {
        if (cache.ContainsKey(key)) {
            DLinkedNode node = cache[key];
            MoveToHead(node);
            return node.value;
        }
        return -1;
    }
    
    public void Put(int key, int value) {
        if (cache.ContainsKey(key)) {
            // Update existing node
            DLinkedNode node = cache[key];
            node.value = value;
            MoveToHead(node);
        } else {
            // Add new node
            DLinkedNode newNode = new DLinkedNode(key, value);
            
            if (cache.Count >= capacity) {
                // Remove least recently used node
                DLinkedNode tailNode = RemoveTail();
                cache.Remove(tailNode.key);
            }
            
            cache[key] = newNode;
            AddToHead(newNode);
        }
    }
    
    private void AddToHead(DLinkedNode node) {
        node.prev = head;
        node.next = head.next;
        
        head.next.prev = node;
        head.next = node;
    }
    
    private void RemoveNode(DLinkedNode node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    
    private void MoveToHead(DLinkedNode node) {
        RemoveNode(node);
        AddToHead(node);
    }
    
    private DLinkedNode RemoveTail() {
        DLinkedNode lastNode = tail.prev;
        RemoveNode(lastNode);
        return lastNode;
    }
}

public class DLinkedNode {
    public int key;
    public int value;
    public DLinkedNode prev;
    public DLinkedNode next;
    
    public DLinkedNode() { }
    
    public DLinkedNode(int key, int value) {
        this.key = key;
        this.value = value;
    }
}

// Alternative: Using built-in LinkedList
public class LRUCache {
    private int capacity;
    private Dictionary<int, LinkedListNode<KeyValuePair<int, int>>> cache;
    private LinkedList<KeyValuePair<int, int>> list;
    
    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new Dictionary<int, LinkedListNode<KeyValuePair<int, int>>>();
        this.list = new LinkedList<KeyValuePair<int, int>>();
    }
    
    public int Get(int key) {
        if (cache.ContainsKey(key)) {
            var node = cache[key];
            list.Remove(node);
            list.AddFirst(node);
            return node.Value.Value;
        }
        return -1;
    }
    
    public void Put(int key, int value) {
        if (cache.ContainsKey(key)) {
            // Update existing
            var node = cache[key];
            list.Remove(node);
            node.Value = new KeyValuePair<int, int>(key, value);
            list.AddFirst(node);
        } else {
            // Add new
            if (cache.Count >= capacity) {
                var lastNode = list.Last;
                cache.Remove(lastNode.Value.Key);
                list.RemoveLast();
            }
            
            var newNode = list.AddFirst(new KeyValuePair<int, int>(key, value));
            cache[key] = newNode;
        }
    }
}
```
