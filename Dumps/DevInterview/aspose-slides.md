# Aspose.Slides API and Methods

Aspose.Slides for .NET is a PowerPoint presentation processing library. It is used to create, read, edit, convert, render, merge, split, protect, and manipulate PPT, PPTX, PPS, PPSX, ODP, and other presentation formats without Microsoft PowerPoint.

Official references:

- Documentation: https://docs.aspose.com/slides/net/
- API Reference: https://reference.aspose.com/slides/net/aspose.slides/

<br>

## 1. What is _Aspose.Slides_?

**Aspose.Slides** is a .NET API for working with presentation documents programmatically. It supports operations on presentations, slides, shapes, text, tables, charts, images, audio, video, animations, notes, comments, themes, layouts, masters, and export formats.

### Common Use Cases

- Create PowerPoint presentations dynamically.
- Read and update existing PPT/PPTX files.
- Convert presentations to PDF, HTML, images, SVG, XPS, TIFF, and video-related outputs.
- Add or modify slides, shapes, text, charts, tables, images, audio, and video.
- Extract text, images, metadata, notes, and comments.
- Apply themes, layouts, transitions, and animations.
- Merge, clone, split, compare, protect, and inspect presentations.

<br>

## 2. What are the main namespaces in _Aspose.Slides_?

| Namespace | Purpose |
|---|---|
| `Aspose.Slides` | Core presentation, slide, shape, text, table, image, audio, video, theme, and layout APIs. |
| `Aspose.Slides.Charts` | Chart creation, chart data, series, axes, legends, labels, and formatting. |
| `Aspose.Slides.Export` | Save/export options for PDF, HTML, SVG, TIFF, images, XPS, and other formats. |
| `Aspose.Slides.Animation` | Slide animation, effects, sequences, timing, and motion paths. |
| `Aspose.Slides.Effects` | Visual effects such as shadow, glow, reflection, blur, fill overlay, and soft edges. |
| `Aspose.Slides.MathText` | Mathematical text, formulas, equations, and math formatting. |
| `Aspose.Slides.SlideShow` | Slide show settings, transitions, timings, and presentation show behavior. |
| `Aspose.Slides.Util` | Utility classes for searching, replacing, joining text portions, and helper operations. |

<br>

## 3. What is the _Presentation_ API?

`Presentation` is the central class. It represents a complete presentation document.

### Important Constructors

```csharp
using Aspose.Slides;

using var pres1 = new Presentation();
using var pres2 = new Presentation("input.pptx");
using var pres3 = new Presentation(stream);
```

### Common Properties

| Property | Purpose |
|---|---|
| `Slides` | Gets the slide collection. |
| `Masters` | Gets master slides. |
| `LayoutSlides` | Gets layout slides. |
| `Sections` | Gets presentation sections. |
| `DocumentProperties` | Gets built-in and custom metadata. |
| `ProtectionManager` | Manages encryption and write protection. |
| `Images` | Gets embedded images. |
| `Audios` | Gets embedded audio files. |
| `Videos` | Gets embedded video files. |
| `FontsManager` | Manages fonts and font substitution. |
| `CommentAuthors` | Gets comment authors. |
| `FirstSlideNumber` | Gets or sets starting slide number. |
| `SlideSize` | Gets or sets slide dimensions. |
| `VbaProject` | Gets or sets VBA macros. |

### Common Methods

| Method | Purpose |
|---|---|
| `Save(string, SaveFormat)` | Saves presentation to a file. |
| `Save(Stream, SaveFormat)` | Saves presentation to a stream. |
| `Save(string, SaveFormat, ISaveOptions)` | Saves with custom export options. |
| `Dispose()` | Releases resources. |
| `GetThumbnails(...)` / `GetImages(...)` | Renders slides as images, depending on library version. |
| `JoinPortionsWithSameFormatting()` | Combines text portions with identical formatting. |
| `HighlightRegex(...)` | Highlights text using regular expression search. |
| `ReplaceRegex(...)` | Replaces matching text using regular expression search. |

### Example

```csharp
using Aspose.Slides;
using Aspose.Slides.Export;

using var pres = new Presentation();
pres.Slides[0].Shapes.AddAutoShape(ShapeType.Rectangle, 50, 50, 300, 100);
pres.Save("output.pptx", SaveFormat.Pptx);
```

<br>

## 4. What is the _Slide_ API?

`Slide` represents a single slide in a presentation.

### Common Properties

| Property | Purpose |
|---|---|
| `Shapes` | Gets all shapes on the slide. |
| `Background` | Gets slide background. |
| `LayoutSlide` | Gets or sets layout slide. |
| `NotesSlideManager` | Manages notes for the slide. |
| `HeaderFooterManager` | Manages header and footer placeholders. |
| `SlideShowTransition` | Gets slide transition settings. |
| `Timeline` | Gets animation timeline. |
| `Hidden` | Hides or shows the slide in slide show. |
| `SlideId` | Gets unique slide ID. |
| `SlideNumber` | Gets or sets slide number. |
| `ThemeManager` | Gets overriding theme manager. |

### Common Methods

| Method | Purpose |
|---|---|
| `GetImage()` | Renders slide as an image. |
| `GetImage(Size)` | Renders slide to a specific size. |
| `GetImage(float, float)` | Renders slide using scale factors. |
| `WriteAsSvg(Stream)` | Exports slide as SVG. |
| `WriteAsSvg(Stream, ISVGOptions)` | Exports slide as SVG with options. |
| `Remove()` | Removes the slide. |
| `Reset()` | Resets layout-based shape formatting and positions. |
| `FindShapeByAltText(string)` | Finds a shape by alternative text. |
| `GetSlideComments(ICommentAuthor)` | Gets comments by author. |
| `JoinPortionsWithSameFormatting()` | Joins similar text portions on slide. |

<br>

## 5. What is the _SlideCollection_ API?

`ISlideCollection` manages slides inside a presentation.

### Common Methods

| Method | Purpose |
|---|---|
| `AddEmptySlide(ILayoutSlide)` | Adds an empty slide with a layout. |
| `AddClone(ISlide)` | Clones a slide into the presentation. |
| `AddClone(ISlide, ILayoutSlide)` | Clones a slide with a specific layout. |
| `InsertEmptySlide(int, ILayoutSlide)` | Inserts an empty slide at index. |
| `InsertClone(int, ISlide)` | Inserts a cloned slide at index. |
| `Remove(ISlide)` | Removes a specific slide. |
| `RemoveAt(int)` | Removes slide by index. |
| `Reorder(int, ISlide)` | Moves slide to another position. |
| `IndexOf(ISlide)` | Gets slide index. |

### Example

```csharp
using var pres = new Presentation("input.pptx");
ISlide first = pres.Slides[0];
pres.Slides.AddClone(first);
pres.Slides.RemoveAt(1);
```

<br>

## 6. What is the _Shape_ API?

`Shape` is the base API for visual objects on slides.

### Common Shape Types

| Type | Purpose |
|---|---|
| `AutoShape` | Built-in shapes such as rectangle, ellipse, arrows, callouts. |
| `PictureFrame` | Image placed on slide. |
| `Table` | Table object. |
| `Chart` | Chart object. |
| `GroupShape` | Group of shapes. |
| `Connector` | Connector line between shapes. |
| `OleObjectFrame` | Embedded OLE object. |
| `AudioFrame` | Audio object. |
| `VideoFrame` | Video object. |
| `SmartArt` | SmartArt diagram. |

### Common Properties

| Property | Purpose |
|---|---|
| `Name` | Gets or sets shape name. |
| `AlternativeText` | Gets or sets accessibility alternative text. |
| `Hidden` | Hides or shows shape. |
| `X`, `Y`, `Width`, `Height` | Gets or sets shape position and size. |
| `Rotation` | Gets or sets rotation. |
| `FillFormat` | Gets fill formatting. |
| `LineFormat` | Gets line formatting. |
| `TextFrame` | Gets text frame for text-capable shapes. |
| `EffectFormat` | Gets effects such as shadow or glow. |
| `ThreeDFormat` | Gets 3D formatting. |
| `HyperlinkClick` | Gets or sets click hyperlink. |
| `HyperlinkMouseOver` | Gets or sets hover hyperlink. |
| `Placeholder` | Gets placeholder information. |
| `ShapeLock` | Gets lock settings. |

### Common Methods

| Method | Purpose |
|---|---|
| `WriteAsSvg(Stream)` | Saves shape as SVG. |
| `GetImage()` | Renders shape as an image. |
| `AddPlaceholder(...)` | Adds placeholder behavior where supported. |
| `RemovePlaceholder()` | Removes placeholder behavior. |

<br>

## 7. What is the _ShapeCollection_ API?

`IShapeCollection` manages shapes on a slide.

### Common Methods

| Method | Purpose |
|---|---|
| `AddAutoShape(ShapeType, float, float, float, float)` | Adds an auto shape. |
| `AddShape(ShapeType, float, float, float, float)` | Adds a general shape. |
| `AddPictureFrame(ShapeType, float, float, float, float, IPPImage)` | Adds an image frame. |
| `AddTable(float, float, double[], double[])` | Adds a table. |
| `AddChart(ChartType, float, float, float, float)` | Adds a chart. |
| `AddConnector(ShapeType, float, float, float, float)` | Adds a connector. |
| `AddGroupShape()` | Adds a group shape. |
| `AddVideoFrame(float, float, float, float, string)` | Adds video. |
| `AddAudioFrameEmbedded(float, float, float, float, IAudio)` | Adds embedded audio. |
| `AddOleObjectFrame(...)` | Adds OLE object. |
| `InsertAutoShape(...)` | Inserts an auto shape. |
| `Remove(IShape)` | Removes a shape. |
| `RemoveAt(int)` | Removes shape by index. |
| `Reorder(int, IShape)` | Changes shape order. |
| `ToArray()` | Converts collection to array. |

### Example

```csharp
ISlide slide = pres.Slides[0];
IAutoShape shape = slide.Shapes.AddAutoShape(ShapeType.RoundCornerRectangle, 40, 40, 300, 80);
shape.TextFrame.Text = "Aspose.Slides";
```

<br>

## 8. What is the _TextFrame_ API?

`TextFrame` stores and formats text inside a shape.

### Important APIs

| API | Purpose |
|---|---|
| `TextFrame` | Text container inside a shape. |
| `Paragraph` | Paragraph inside a text frame. |
| `Portion` | Text run inside a paragraph. |
| `ParagraphFormat` | Paragraph-level formatting. |
| `PortionFormat` | Character-level formatting. |

### Common Properties and Methods

| Member | Purpose |
|---|---|
| `TextFrame.Text` | Gets or sets all text. |
| `TextFrame.Paragraphs` | Gets paragraph collection. |
| `Paragraph.Portions` | Gets text portions. |
| `Paragraph.ParagraphFormat` | Gets paragraph formatting. |
| `Portion.Text` | Gets or sets portion text. |
| `Portion.PortionFormat` | Gets character formatting. |
| `Paragraphs.Add(...)` | Adds paragraph. |
| `Portions.Add(...)` | Adds portion. |
| `Paragraphs.Remove(...)` | Removes paragraph. |
| `Portions.Remove(...)` | Removes portion. |

### Example

```csharp
IAutoShape box = slide.Shapes.AddAutoShape(ShapeType.Rectangle, 50, 50, 400, 120);
box.TextFrame.Text = "Interview Navigator";
box.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = 28;
```

<br>

## 9. What are the common fill, line, and effect APIs?

| API | Common Members |
|---|---|
| `FillFormat` | `FillType`, `SolidFillColor`, `GradientFormat`, `PatternFormat`, `PictureFillFormat` |
| `LineFormat` | `FillFormat`, `Width`, `DashStyle`, `Style`, `BeginArrowheadStyle`, `EndArrowheadStyle` |
| `EffectFormat` | `EnableOuterShadowEffect()`, `EnableInnerShadowEffect()`, `EnableGlowEffect()`, `EnableReflectionEffect()`, `DisableOuterShadowEffect()` |
| `ThreeDFormat` | `Depth`, `BevelTop`, `BevelBottom`, `Camera`, `LightRig`, `Material` |

### Example

```csharp
shape.FillFormat.FillType = FillType.Solid;
shape.FillFormat.SolidFillColor.Color = Color.SteelBlue;
shape.LineFormat.Width = 2;
shape.LineFormat.FillFormat.SolidFillColor.Color = Color.White;
```

<br>

## 10. What is the _Table_ API?

`Table` represents tabular data on a slide.

### Common Members

| Member | Purpose |
|---|---|
| `Rows` | Gets table rows. |
| `Columns` | Gets table columns. |
| `FirstRow` | Applies first-row style. |
| `FirstCol` | Applies first-column style. |
| `StylePreset` | Applies built-in table style. |
| `MergeCells(...)` | Merges cells. |
| `CellFormat` | Formats cell borders/fill. |
| `TextFrame` | Gets cell text. |

### Example

```csharp
double[] columns = { 120, 120, 120 };
double[] rows = { 40, 40 };
ITable table = slide.Shapes.AddTable(50, 50, columns, rows);
table[0, 0].TextFrame.Text = "API";
table[1, 0].TextFrame.Text = "Purpose";
```

<br>

## 11. What is the _Chart_ API?

Charts are available through `Aspose.Slides.Charts`.

### Main APIs

| API | Purpose |
|---|---|
| `IChart` | Represents chart object. |
| `IChartData` | Manages chart workbook data. |
| `IChartSeries` | Represents data series. |
| `IChartCategory` | Represents categories. |
| `IChartDataWorkbook` | Works with chart data cells. |
| `IChartAxis` | Represents value/category axes. |
| `ILegend` | Represents chart legend. |
| `IDataLabel` | Represents data labels. |

### Common Methods and Properties

| Member | Purpose |
|---|---|
| `AddChart(ChartType, x, y, w, h)` | Adds chart to slide. |
| `ChartData.Series` | Gets series collection. |
| `ChartData.Categories` | Gets category collection. |
| `Series.Add(...)` | Adds chart series. |
| `Categories.Add(...)` | Adds category. |
| `DataPoints.AddDataPointForBarSeries(...)` | Adds bar-series data point. |
| `DataPoints.AddDataPointForLineSeries(...)` | Adds line-series data point. |
| `Axes.VerticalAxis` | Gets value axis. |
| `Axes.HorizontalAxis` | Gets category axis. |
| `Legend.Position` | Sets legend position. |

### Example

```csharp
using Aspose.Slides.Charts;

IChart chart = slide.Shapes.AddChart(ChartType.ClusteredColumn, 50, 50, 500, 300);
chart.ChartTitle.AddTextFrameForOverriding("Quarterly Sales");
```

<br>

## 12. What are the image APIs?

| API | Purpose |
|---|---|
| `IPPImage` | Represents image stored in presentation. |
| `ImageCollection` | Stores presentation images. |
| `PictureFrame` | Displays an image on a slide. |
| `AddImage(Image)` | Adds image to presentation. |
| `AddImage(Stream)` | Adds image from stream. |
| `AddPictureFrame(...)` | Places image on slide. |
| `GetImage()` | Renders slide or shape as image. |

### Example

```csharp
IPPImage image = pres.Images.AddImage(File.ReadAllBytes("logo.png"));
slide.Shapes.AddPictureFrame(ShapeType.Rectangle, 40, 40, 160, 80, image);
```

<br>

## 13. What are the audio and video APIs?

| API | Purpose |
|---|---|
| `IAudio` | Represents embedded audio. |
| `IAudioFrame` | Audio frame on slide. |
| `IVideo` | Represents embedded video. |
| `IVideoFrame` | Video frame on slide. |
| `AudioCollection` | Stores audio files. |
| `VideoCollection` | Stores video files. |
| `AddAudio(...)` | Adds audio to presentation. |
| `AddVideo(...)` | Adds video to presentation. |
| `AddAudioFrameEmbedded(...)` | Adds embedded audio frame. |
| `AddVideoFrame(...)` | Adds video frame. |

<br>

## 14. What are the animation APIs?

Animation APIs are available through `Aspose.Slides.Animation`.

| API | Purpose |
|---|---|
| `IAnimationTimeLine` | Main animation timeline. |
| `ISequence` | Sequence of animation effects. |
| `IEffect` | Single animation effect. |
| `EffectType` | Animation effect type. |
| `EffectSubtype` | Animation subtype. |
| `EffectTriggerType` | Trigger behavior. |
| `ITiming` | Timing configuration. |
| `IMotionEffect` | Motion path effect. |

### Common Methods

| Method | Purpose |
|---|---|
| `MainSequence.AddEffect(...)` | Adds animation effect to a shape. |
| `MainSequence.Remove(...)` | Removes animation effect. |
| `MainSequence.Clear()` | Removes all effects. |
| `InteractiveSequences.Add(...)` | Adds trigger-based animation sequence. |

### Example

```csharp
using Aspose.Slides.Animation;

IEffect effect = slide.Timeline.MainSequence.AddEffect(
    shape,
    EffectType.Fade,
    EffectSubtype.None,
    EffectTriggerType.OnClick);
```

<br>

## 15. What are the transition and slide show APIs?

| API | Purpose |
|---|---|
| `SlideShowTransition` | Controls transition for a slide. |
| `TransitionType` | Transition effect type. |
| `AdvanceAfterTime` | Time-based slide advance. |
| `AdvanceOnClick` | Click-based slide advance. |
| `SlideShowSettings` | Presentation-wide slide show settings. |

### Example

```csharp
slide.SlideShowTransition.Type = TransitionType.Fade;
slide.SlideShowTransition.AdvanceOnClick = true;
slide.SlideShowTransition.AdvanceAfterTime = 3000;
```

<br>

## 16. What are the master slide, layout slide, and theme APIs?

| API | Purpose |
|---|---|
| `IMasterSlide` | Represents master slide. |
| `IMasterSlideCollection` | Collection of master slides. |
| `ILayoutSlide` | Represents layout slide. |
| `IGlobalLayoutSlideCollection` | Collection of layouts. |
| `IThemeManager` | Manages themes. |
| `IOverrideThemeManager` | Manages slide-level theme overrides. |
| `IColorScheme` | Theme colors. |
| `IFontScheme` | Theme fonts. |
| `IFormatScheme` | Theme formatting. |

### Common Methods

| Method | Purpose |
|---|---|
| `Masters.AddClone(...)` | Adds cloned master slide. |
| `LayoutSlides.Add(...)` | Adds layout slide where supported. |
| `Slide.Reset()` | Resets slide to layout defaults. |
| `CreateThemeEffective()` | Gets effective theme. |

<br>

## 17. What are the notes and comments APIs?

| API | Purpose |
|---|---|
| `INotesSlideManager` | Adds, accesses, and removes notes slide. |
| `INotesSlide` | Represents notes slide. |
| `ICommentAuthor` | Represents comment author. |
| `IComment` | Represents a comment. |
| `ICommentCollection` | Collection of comments. |
| `ICommentAuthorCollection` | Collection of authors. |

### Common Methods

| Method | Purpose |
|---|---|
| `NotesSlideManager.AddNotesSlide()` | Adds notes slide. |
| `NotesSlideManager.RemoveNotesSlide()` | Removes notes slide. |
| `CommentAuthors.AddAuthor(...)` | Adds comment author. |
| `Comments.AddComment(...)` | Adds comment. |
| `Slide.GetSlideComments(...)` | Gets comments for a slide and author. |

<br>

## 18. What are the document property and metadata APIs?

| API | Purpose |
|---|---|
| `IDocumentProperties` | Built-in and custom document properties. |
| `Author` | Gets or sets author. |
| `Title` | Gets or sets title. |
| `Subject` | Gets or sets subject. |
| `Keywords` | Gets or sets keywords. |
| `Comments` | Gets or sets document comments. |
| `Company` | Gets or sets company. |
| `CreatedTime` | Gets or sets created date. |
| `LastSavedTime` | Gets or sets last saved date. |
| `SetCustomPropertyValue(...)` | Adds or updates custom property. |
| `GetCustomPropertyValue(...)` | Reads custom property. |
| `RemoveCustomProperty(...)` | Removes custom property. |

### Example

```csharp
pres.DocumentProperties.Author = "Interview Navigator";
pres.DocumentProperties.Title = "Aspose Slides API Notes";
pres.DocumentProperties.SetCustomPropertyValue("Reviewed", true);
```

<br>

## 19. What are the protection APIs?

| API | Purpose |
|---|---|
| `ProtectionManager` | Manages presentation protection. |
| `Encrypt(string)` | Encrypts presentation with password. |
| `RemoveEncryption()` | Removes encryption. |
| `CheckPassword(string)` | Checks password. |
| `SetWriteProtection(string)` | Adds write protection. |
| `RemoveWriteProtection()` | Removes write protection. |
| `IsEncrypted` | Checks encryption status. |
| `IsWriteProtected` | Checks write protection status. |

### Example

```csharp
pres.ProtectionManager.Encrypt("password");
pres.Save("protected.pptx", SaveFormat.Pptx);
```

<br>

## 20. What are the export and conversion APIs?

Export APIs are mostly in `Aspose.Slides.Export`.

### Common Save Formats

| SaveFormat | Output |
|---|---|
| `SaveFormat.Pptx` | PowerPoint Open XML presentation. |
| `SaveFormat.Ppt` | Legacy PowerPoint presentation. |
| `SaveFormat.Pdf` | PDF document. |
| `SaveFormat.Html` | HTML document. |
| `SaveFormat.Xps` | XPS document. |
| `SaveFormat.Tiff` | TIFF image. |
| `SaveFormat.Odp` | OpenDocument presentation. |
| `SaveFormat.Ppsx` | PowerPoint slide show. |
| `SaveFormat.Svg` | SVG output where supported. |

### Common Options Classes

| Options API | Purpose |
|---|---|
| `PdfOptions` | PDF export settings. |
| `HtmlOptions` | HTML export settings. |
| `SVGOptions` | SVG export settings. |
| `TiffOptions` | TIFF export settings. |
| `PptxOptions` | PPTX save settings. |
| `PptOptions` | PPT save settings. |
| `OdpOptions` | ODP save settings. |
| `RenderingOptions` | Rendering options for images. |
| `NotesCommentsLayoutingOptions` | Controls notes/comments during export. |

### Examples

```csharp
using Aspose.Slides.Export;

pres.Save("deck.pdf", SaveFormat.Pdf);
pres.Save("deck.html", SaveFormat.Html);
pres.Save("deck.tiff", SaveFormat.Tiff);
```

```csharp
var pdfOptions = new PdfOptions
{
    Compliance = PdfCompliance.PdfA1b,
    JpegQuality = 90
};

pres.Save("deck.pdf", SaveFormat.Pdf, pdfOptions);
```

<br>

## 21. What are common utility APIs?

| API | Purpose |
|---|---|
| `SlideUtil` | Utility operations for slides. |
| `PresentationFactory` | Reads presentation information and creates presentation instances. |
| `TextSearchOptions` | Options for text search. |
| `FontData` | Represents font data. |
| `FontsLoader` | Loads external fonts. |
| `FontsManager` | Manages fonts in presentation. |
| `License` | Applies Aspose license. |
| `Metered` | Applies metered license. |

### Licensing Example

```csharp
var license = new License();
license.SetLicense("Aspose.Slides.lic");
```

<br>

## 22. What are the most used Aspose.Slides APIs and methods in real projects?

| Task | API / Method |
|---|---|
| Create presentation | `new Presentation()` |
| Open presentation | `new Presentation("file.pptx")` |
| Save presentation | `Presentation.Save(...)` |
| Add slide | `Slides.AddEmptySlide(...)` |
| Clone slide | `Slides.AddClone(...)` |
| Remove slide | `Slides.RemoveAt(...)`, `Slide.Remove()` |
| Add shape | `Shapes.AddAutoShape(...)` |
| Add text | `shape.TextFrame.Text` |
| Format text | `PortionFormat`, `ParagraphFormat` |
| Add image | `Images.AddImage(...)`, `Shapes.AddPictureFrame(...)` |
| Add table | `Shapes.AddTable(...)` |
| Add chart | `Shapes.AddChart(...)` |
| Add hyperlink | `HyperlinkClick`, `HyperlinkMouseOver` |
| Add animation | `Timeline.MainSequence.AddEffect(...)` |
| Add transition | `SlideShowTransition.Type` |
| Export PDF | `Save("file.pdf", SaveFormat.Pdf)` |
| Export image | `Slide.GetImage(...)` |
| Export SVG | `Slide.WriteAsSvg(...)`, `Shape.WriteAsSvg(...)` |
| Read metadata | `DocumentProperties` |
| Protect file | `ProtectionManager.Encrypt(...)` |
| Add notes | `NotesSlideManager.AddNotesSlide()` |
| Add comments | `CommentAuthors.AddAuthor(...)`, `Comments.AddComment(...)` |

<br>

## 23. Quick interview summary

- `Presentation` is the root object.
- `Slides` manages slide collection.
- `Slide` contains `Shapes`, background, notes, comments, transition, and timeline.
- `Shapes` adds text boxes, charts, tables, images, audio, video, connectors, groups, and OLE objects.
- `TextFrame`, `Paragraph`, and `Portion` handle text.
- `FillFormat`, `LineFormat`, `EffectFormat`, and `ThreeDFormat` handle visual styling.
- `Aspose.Slides.Charts` handles charts.
- `Aspose.Slides.Animation` handles animations.
- `Aspose.Slides.Export` handles conversion and rendering.
- `DocumentProperties` manages metadata.
- `ProtectionManager` manages password protection and encryption.
- `SaveFormat` controls output type.

