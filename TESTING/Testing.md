## How do you write a unit test using xUnit for a class with dependencies?

```csharp
public class OrderService
{
    private readonly IEmailService _emailService;
    public OrderService(IEmailService emailService) => _emailService = emailService;

    public void PlaceOrder() => _emailService.SendEmail("Order placed");
}

public class OrderServiceTests
{
    [Fact]
    public void PlaceOrder_CallsSendEmail()
    {
        var mockEmail = new Mock<IEmailService>();
        var service = new OrderService(mockEmail.Object);

        service.PlaceOrder();

        mockEmail.Verify(x => x.SendEmail("Order placed"), Times.Once);
    }
}

```

## How do you write parameterized tests in xUnit?

```csharp
[Theory]
[InlineData(1, 2, 3)]
[InlineData(5, 7, 12)]
[InlineData(-1, 1, 0)]
public void Add_VariousNumbers_ReturnsCorrectSum(int a, int b, int expected)
{
    var calc = new Calculator();
    Assert.Equal(expected, calc.Add(a, b));
}

```
