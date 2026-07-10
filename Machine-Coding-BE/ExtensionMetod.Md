```
public static class GeneralExtensions
{
    public static bool IsNullOrEmpty(this string? value)
    {
        return string.IsNullOrEmpty(value);
    }

    public static bool IsEven(this int number)
    {
        return number % 2 == 0;
    }

    public static string ToTitleCase(this string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            return value;

        return char.ToUpper(value[0]) + value[1..].ToLower();
    }
}
```
