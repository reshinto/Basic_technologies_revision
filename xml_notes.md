# XML Syntax
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
