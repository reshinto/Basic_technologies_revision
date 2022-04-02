# XML (eXtensible Markup Language)
- became a W3C recommendation or standard in 1998
- it is a tag-based syntax, similar to HTML
  - XML is NOT a replacement for HTML
- X means eXtensible
  - can use existing tags
  - or can make your own tags
    - any app that can read XML, will be able to parse and read
- XML is the foundation of several Web technologies
  - e.g.:
    - XHTML: HTML formatted as XML syntax
    - RSS/ATOM: used for publishing, such as blogs
    - AJAX: asynchronous JavaScript and XML, XML is the X in AJAX
    - Web services: using APIs over the web
      - XML can be used to exchange data over the web
## What is XML used for
- used to structure and describe information
- purpose is to take in information and apply structure and meaning to it
- it was intended to be used over the internet
- used to exchange data between disparate systems that may have never been intended to talk with each other
  - e.g.: using XML to bridge the gap between a very old computer system to a new application so as to allow data to be accessed by newer systems
## XML related technologies
- technologies that make working with XML to solve certain problems easier and more productive
- e.g.:
  - `XPath`: eXtensible Path Language
    - it's called XPath because it uses a path-life syntax to perform queries on XML data
    - XPath is similar to how files are organized on the computer
      - `~/dev/example/file`
    - used to find and extract information from XML documents
    - a sort of a derivative form of `XQuery`
      - but is used for extracting information from XML in an advanced way
  - `XSLT`: XML Stylesheet Language Transformations
    - a kind of CSS
    - can be used to style XML information, important word is trsnformations
    - provides a way of taking XML information and transforming it into something else
      - transforming into any file (e.g.: pdf, text, webpage, any file format)
  - `XQuery`: XML Query
    - a type of SQL for XML
    - a way of extracting data from XML as if it were a database
    - provides more advanced querying than `XPath`
    - can build complex queries that search multiple XML files to extract and join information
  - `Xpointer` and `XLink`
    - create links between and within XML documents
    - similar to link tag in HTML, but more powerful
## Describing Data with XML
- raw data
  ```
  Joe Marini
  - +1 (415) 555-1234 (home)
  - +1 (800) 555-9867 (work)
  - +1 (510) 555-1212 (mobile)
  - joe@joe.com
  ```
- xml data
  ```xml
  <BusinessCard>
    <name>Joe Marini</name>
    <phone type="home">+1 (415) 555-1234</phone>
    <phone type="work">+1 (800) 555-9867</phone>
    <phone type="mobile">+1 (510) 555-1212</phone>
    <email>joe@joe.com</email>
  </BusinessCard>
  ```
## Pros and Cons of XML
|pros|cons|
|-|-|
|`XML keeps content separate from presentation.` You can take the data that your app uses & store it separately from how its's presented to users|`XML is not suitable for very large data sets.` might not be efficient if storing MB of data|
|`XML is an open format that can be read by many apps.` Many apps also have ability to output XML|`Some formats like JSON might be better for storing data`|
|`XML can be used on both the client and the server.`|`Some data types like images aren't represented well.` Can try to encode images and insert into XML documents but can get ugly quickly|
|`XML has widespread support in multiple languages and runtimes.`|`XML can quickly become difficult to read when complex`|
|`XML makes it possible for disparate systems to exchange data.`||

## Types of XML Content
- XML Document Declaration
  - it is optional, but W3C recommends it
  - it identifies the file as XML document
  - provides a place for the encoding and standalone attributes
  - must be at very beginning, no whitespace before it
  - `encoding` attribute defaults to `UTF-8` if it is not included
  - `standalone` attribute identifies whether or not the document stands by itself or depends on something else
  ```xml
  <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  ```
- Elements (Tags) and Attributes
  - `Elements` must have valid names
    - can begin with underscore `_` or letter
      - followed by letters, digits, periods, hyphens, underscores
    - cannot use the string `xml` in any case combination because the W3C reserves that
  - `Attributes` are specified on opening element tags
    - must start with letter or underscore
      - can be followed by digits, letters, hypens, periods, underscores
    - attributes that begin with "xml" are reserved
    - attributes appear only once on a given element
  ```xml
  <element attribute="value">
  ```
  - valid tag names
    ```xml
    <_Element1>
    
    <My.Element>
      
    <My-Element_Name>
    ```
  - invalid tag names
    ```xml
    <1Tag> <!-- can't begin with a number -->
    
    <#Elem&ent> <!-- invalid characters in name -->
      
    <XmL> <!-- the string "xml" is reserved -->
    ```
- Comments
  - can go almost anywhere except
    - inside element brackets
    - before the document declaration
  ```xml
  <!-- This is an XML comment -->
  ```
  - valid comments
    ```xml
    <element>
      <!-- comment -->
    </element>
    ```
  - invalid comments
    ```xml
    <element <!-- comment --> >
    ```
- Character Data
  - specified using CDATA and are part of document content
  - the actual contents of CDATA sections are not parsed by XML parser
    - it skips the internal content and doesn't try to figure what kind of data might be in there
  - typically used to contain unescaped textual data (characters that aren't legal within parsed XML)
    - e.g.: &, <, >
  ```xml
  <![CDATA[This is unparsed text & data]]>
  ```
  - invalid xml
    ```xml
    <script>
      function f(a, b) {
        return a < b;  // invalid because < is illegal in XML
      }
    </script>
    ```
  - valid xml by using CDATA
    ```xml
    <script>
      <![CDATA[
        function f(a, b) {
          return a < b;
        }
      ]]>
    </script>
    ```
- Processing Instructions
  - a way for XML content to deliver special instructions to XML parser
    ```xml
    <?targetName instruction ?>
    ```
  - "xml" target name is reserved
  - can start with number or letter, then followed by digits, letters, hyphens, periods, underscores
  - e.g.: app has multiple spell checking modes
    ```xml
    <?SpellCheckMode mode="us-english" ?>
    ```
- Entity References
  - help shorten and modularize XML documents
  - provide markup for illegal characters
  - `General entities`
    - replaces by parser with a full string
    - e.g.:
      ```xml
      &copyright;
      &author;
      ```
  - `Character entities`
    ```xml
    &#60;
    &amp;
    &quot;
    ```

## View Groups, Root View, Parent
* contains Child groups
* these child groups are Siblings of each other
### Linear Layout
* <LinearLayout attributeNames <TextView attributeNames /> /LinearLayound>
* align Views in a linear layout vertically or horizontally: TextView, ImageView
* Attribute names for <LinearLayout> /LinearLayout>
    #### xmlns:android="http://schemas.android.com/apk/res/android"
        * this is used to specify that all of these attributes here belong to android
        * Must add XML namespace declaration in opening tag of root view of XML file
    #### orientation
        * android:orientation="vertical"
        * android:orientation="horizontal"
    #### Size
        * wrap_content
            * android:layout_width="wrap_content"
            * android:layout_height="wrap_content"
        * match_parent
            * use this to match device size
            * android:layout_width="match_parent"
            * android:layout_height="match_parent"
### Relative Layout
* can position children relative to the parent
* can position children relative to other children views
* Attribute names for <RelativeLayout> </RelativeLayout>
    * same as LinearLayout, except orientation is not included
    #### xmlns:android="http://schemas.android.com/apk/res/android"
    #### Size
* child attribute names
    * use android:layout_alignParentTop="true"
    * use android:layout_alignParentBottom="true"
    * use android:layout_alignParentLeft="true"
    * use android:layout_alignParentRight="true"
    * use android:layout_centerHorizontal="true"
    * use android:padding="xxdp"
    * Assign view ID names
        * android:id="@+id/textView_A"
            * + is required when declaring id name for the first time
            * textView_A is the id name
    * positioning children relative to other views
        * android:layout_toLeftOf="@id/textView_A"
        * android:layout_above="@id/textView_A"

## XML element (tags)
* TextView, ImageView, Button
* e.g.: <TextView attributeNames/>

## Attribute names, these must be inside the XML element tags
* e.g.: android:text, android:textColor, android:background, android:layout_width, etc.
### Attribute names for <TextView attributeNames/>
    * android:text="Hello World!"
    #### colors
        * limited colors
            * android:background="@android:color/darker_gray"
            * android:textColor="@android:color/darker_gray"
        * almost unlimited colors by using the HEX COLOR CODE
            * android:background="#2196F3"
            * android:textColor="#2196F3"
    #### height and width
        * Set size with dp
            * android:layout_height="150dp"
            * android:layout_width="150dp"
        * disadvantage: have to keep manually changing the size
        * Use wrap_content to change the size automatically
            * android:layout_width="wrap_content"
            * android:layout_height="wrap_content"
        * Use match_parent to have the same size as parent
            * android:layout_width="match_parent"
            * android:layout_height="match_parent"
        * Use android:layout_weight="0"
            * 0 is the default value or shares
            * layout weight is the number of layout shares a child can hold
            * the more shares a child have, the more space it can claim from the layout
            * during horzontal orientation
                * android:layout_width="0dp"  must be 0dp cuz dunno the size
                * android:layout_weight="1"  higher the value, more space given
            * during vertial orientation
                * android:layout_height="0dp"
                * android:layout_weight="1"
    #### change text size
        * android:textSize="45sp"
            * Scale Independent Pixels (sp)
                * A unit of measure similar to dp
                * Makes app consistent across different devices of different densities
            * Used for FONTS cuz it adjusts based on user's prefs & settings for txt size
        * android:textAppearance="?android:textAppearanceSmall"
        * android:textAppearance="?android:textAppearanceMedium"
        * android:textAppearance="?android:textAppearanceLarge"
    #### change text styles
        * android:textStyle="bold"
        * android:textStyle="italic"
    #### change position  !!!Use only for RelativeLayout
        * android:layout_alignParentRight="true"
        * android:layout_alignParentLeft="false"  false by default, dun need declare
        * android:layout_alignParentTop="true"
        * android:layout_alignParentBottom="false"
    #### Padding: spaces inside the box
        * according to material design principles:
            * set components align to 8dp baseline grid
            * set type aligns to 4db baseline grid
            * set toolbars align to 4db square baseline grid
        * android:padding="8dp"  add spaces to all sides
        * android:paddingLeft="8dp"
        * android:paddingRight="8dp"
        * android:paddingTop="8dp"
        * android:paddingBottom="8dp"
    #### Margin: spaces outside the box
        * android:layout_margin="8dp"  add spaces to all sides
        * android:layout_marginLeft="8dp"
        * android:layout_marginRight="8dp"
        * android:layout_marginTop="8dp"
        * android:layout_marginBottom="8dp"
### Attribute names for <ImageView attributeNames/>
    * android:src="@drawable/cake"
        * @ symbol is used to say we're referencing a resource in the Android app
        * src is the source
        * drawable is the resource type
        * cake is the filename
    * android:layout_width="wrap_content"
    * android:layout_height="wrap_content"
    * scaleType
        * scaleType tells the device how to scale up or scale down image,
        * based on the bound of the <ImageView attributeNames/>
        * android:scaleType="center"
            * center does not change the size of the image, only center it
        * android:scaleType="centerCrop"
            * This scales down the image to fit the height & width of the view
            * also maintain aspect ratio of the original image
            * so it doesn't get distorted
            * once it scaled down, image will be centered & cropped to fit view size
            * creates a FULL BLEED IMAGE with edge to edge look without white borders

## Density-Independent Pixels (dp)
* Pixels are the number of squares that mades the resolution of the device
* better device have more pixels in the same amount of space
* the number of pixedls in a fixed space is known as the SCREEN'S PIXEL DENSITY
    * e.g.: a button that takes up 2 pixels by 2 pixels, device size is standard
    * More pixels = higher resolution = button size will shrink (become smaller)
    * Therefore, to make button size the same size despite the changes in resolution
    * need to use dp
* Recommended to make touch target 48dp minimum (translates to 9mm in physical size)
