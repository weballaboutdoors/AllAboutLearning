import React from 'react';
import { 
  Container, Typography, Box, Grid, Card, CardContent, 
  Button, Divider, Paper, List, ListItem, ListItemText, Zoom, IconButton, Tooltip, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import StaggeredFadeIn from '../common/StaggeredFadeIn';
import { Article, Image, Description, Assignment, 
Compare, Inventory, ViewModule, Dashboard, Category } from '@mui/icons-material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useState, useEffect } from 'react';
import { Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { CheckCircle, ArrowDownward } from '@mui/icons-material';
import { Collapse } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import SearchBar from '../common/SearchBar';
import searchIndex from '../../searchIndex';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ArticleIcon from '@mui/icons-material/Article';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BreadcrumbTrail from '../common/BreadcrumbTrail';

function WebDepartment() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [showScroll, setShowScroll] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

    // Add this useEffect for scroll detection
    useEffect(() => {
        const checkScrollTop = () => {
            if (!showScroll && window.pageYOffset > 400) {
                setShowScroll(true);
            } else if (showScroll && window.pageYOffset <= 400) {
                setShowScroll(false);
            }
        };

        window.addEventListener('scroll', checkScrollTop);
        return () => window.removeEventListener('scroll', checkScrollTop);
    }, [showScroll]);

    // Add this scroll function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

  // Table of Contents for navigation
  const sections = [
    { id: 'images', title: 'Images' },
    { id: 'descriptions', title: 'Descriptions' },
    { id: 'guidelines', title: 'General Guidelines' },
    { id: 'filemaker', title: 'FileMaker: Creating a new record' },
    { id: 'inventory-vs-matrix', title: 'Inventory Items vs. Matrix Items' },
    { id: 'inventory-item', title: 'NetSuite: Creating an Inventory Item' },
    { id: 'matrix-item', title: 'NetSuite: Creating a Matrix Item' },
    { id: 'commerce-categories', title: 'NetSuite: Guide to Commerce Categories' },
    { id: 'navigating-the-warehouse', title: 'Navigating the Warehouse' }
  ];

  const sectionIcons = {
    'images': <Image />,
    'descriptions': <Description />,
    'guidelines': <Assignment />,
    'filemaker': <Article />,
    'inventory-vs-matrix': <Compare />,
    'inventory-item': <Inventory />,
    'matrix-item': <ViewModule />,
    'commerce-categories': <Category />,
    'navigating-the-warehouse': <Dashboard />
  };

  const sectionContent = {
    images: {
        title: 'Images',
        content: `
            Image Specifications:
            1. Canvas Sizes:
               • Item Display: 600 x 600 pixels
               • Category Thumbnails: 240 x 240 pixels
    
            2. Logo Requirements:
               • ALL images must have watermark
               • AADW logo: Bottom Right Corner (Download PSD template)
               • Vendor logo: Bottom Left Corner
    
            Image Content Guidelines:
            1. Item Placement:
               • Show installation/use angle
               • Match line drawing angle when possible
               • Verify correct orientation
               • Balance space usage
    
            2. Text Formatting:
               Main Heading:
               • 42-48 pt Times New Roman (48 ideal)
               • Prioritize important keywords
               • Omit brand name and redundant application info
               
               Sub-Headings:
               • 30-36 pt Times New Roman (36 ideal)
               
               Measurements:
               • Arial or Helvetica, minimum 24 pt
               • Use red for better visibility if needed
    
            Required Image Sequence:
            1. Primary Image (Required):
               • Show all vital details
               • Include heading and sub-heading
               • Add logos
               • Include color swatches for matrix items
    
            2. Measurement Image (Required):
               • Use real photo or line drawing
               • Keep logos, remove headings
               • Use red lines/font if needed for clarity
    
            Optional Additional Images:
            3. Multiple Angles:
               • Show 2-3 angles in same picture
               • Include installation context
               • Display handing or unit size
    
            4. Comparison Images:
               • Show similar parts
               • Highlight differences
               • Include size variations
    
            5. Package Contents:
               • Show included items
               • Add manufacturer diagrams
               • Include relevant charts
    
            6. Matrix Items Final Image:
               • Show all color options
               • Use actual product photos when possible
               • Include complete color swatch set
    
            Color Options Guidelines:
            • Include 3 color swatches under "Choose Color"
            • Use Photoshop template
            • Show all available colors in final image
            • Prefer actual photos over swatches
    
            File Saving Protocol:
            1. Save Two Formats:
               • PSD (File > Save As)
               • JPG (File > Export > Export As)
    
            2. Naming Convention:
               Format: [ItemNumber]_main-[ImageNumber]
               Example: 123456_main-01, 123456_main-02
    
            Best Practices:
            • Maintain consistent image quality
            • Follow naming conventions exactly
            • Include all required logos
            • Verify image dimensions
            • Check text formatting
            • Ensure proper color representation
        `,
        additionalContent: {
            type: 'stacked',
            images: [
                {
                    src: '/AllAboutLearning/images/departments/web/web-images-product-photo.jpg',
                    alt: 'Steel Wheel Product Photo',
                    caption: 'Product Photo Example'
                },
                {
                    src: '/AllAboutLearning/images/departments/web/web-images-technical-drawing.jpg',
                    alt: 'Steel Wheel Technical Drawing',
                    caption: 'Technical Drawing Example'
                }
            ]
        }
    },
    descriptions: {
        title: 'Descriptions',
        content: `
            Description Writing Process:
            1. Initial Setup:
               • Copy manufacturer information to FileMaker
               • Organize content following guidelines
               • Ensure all crucial details are included
    
            Content Structure:
            1. First Paragraph (SEO Focus):
               • Include essential keywords
               • Write for Google search snippets
               • Summarize key features concisely
               • Make product relevance clear immediately
    
            2. Details & Specifications:
               • Use "1 line, 1 thought" format
               • Example formats:
                 - "Handed: Yes, as shown"
                 - "Handed: No, works with left and right-hand doors"
               • Include pricing structure (individual/pairs/set)
               • Reinforce key features through repetition
    
            3. Additional Information:
               • Aesthetics details
               • Key features (reinforcement)
               • Finish specifications
               • Installation guidelines
               • Note: Exclude warranty information
    
            4. Resources Section:
               • Link to manufacturer guides
               • Include how-to articles
               • Add related category links
               • Provide installation guides
    
            5. Related Parts:
               • List only website-available parts
               • Format: [Part Number] - [Item Name]
               • Create clickable links to products
               • Verify all links are working
    
            Video Integration:
            1. YouTube Embedding:
               • Click Share → Embed
               • Copy embed code
               • Click "Source" in description editor
               • Paste code on new line
    
            Fonts and sizes:
            • Use the default text font for the description
            • Use 18px for body text
            • Use Heading 2 and 24px for the product description title
    
            Best Practices:
            • Maintain consistent formatting
            • Use clear, concise language
            • Focus on searchable content
            • Verify all links regularly
            • Update content as needed
            • Keep descriptions current
            • Check for broken links
        `,
        imagePath: '/AllAboutLearning/images/departments/web/web-description-example.png',
        imageAlt: 'Description Format Example',
        productUrl: 'https://www.allaboutdoors.com/Handle-Set-Sliding-Patio-Door-Extruded-Aluminum-Wood-',
        imagePath2: '/AllAboutLearning/images/departments/web/web-description-example-2.png',
        imageAlt2: 'Description Format Example 2'
    },
    guidelines: {
        title: 'General Guidelines',
        content: `
          The image to the right displays color codes used throughout the website.
          Can be used on multiple occasions, including:
          • Product descriptions
          • Category pages
          • Product images
          • Blemished Items
          
          Remember to Check that all information entered is correct before publishing.
      
          Follow these general guidelines when creating a blemished item:
          • Add "-BLEM" to the end of the item number (123456-BLEM)
          • Only create records for blemished items in NetSuite, NOT FileMaker
          • Use a photo of the actual blemished item as the first image to avoid looking identical to the new items. Circle the blemishes in red if they aren't obvious.
          
          The image to the right displays an example of a blemished item.
        `,
        additionalContent: {
          type: 'stacked',
          images: [
            {
              src: '/AllAboutLearning/images/departments/web/web-general-guidelines.png',
              alt: 'Color Codes Reference',
              caption: 'Color Codes'
            },
            {
              src: '/AllAboutLearning/images/departments/web/web-general-guidelines-blem.png',
              alt: 'Blemished Item Example',
              caption: 'Blemished Item'
            }
          ]
        }
      },
      filemaker: {
        title: 'FileMaker: Creating a new record',
        content: `
          Steps to create a new record in FileMaker:
          1. Open the FileMaker database
          2. Click the plus sign labeled New Record along the top menu bar (Command + N)
          3. Enter the Vendor Part Number (the part number the vendor uses)
          4. Enter the Inventory Part Number (the part number we use on our website)
              a) You will usually be provided with a part number to use. If not, we likely use the vendor's part 
              number. Check a few records in FileMaker to see if we use the same number as the vendor. If 
              not, ask the Web Department Manager for help with creating a new unique part number.
              b) Vendor numbers we always use: Andersen, HOPPE (except cylinders), G-U/Ferco, Roto (minus the last two digits, which refer to the item's color), Giesse…
          5. Enter the Purchase Vendor (the company we bought the item from)
          6. Leave the Warehouse Bin Location blank unless supplied with the exact Bin # from the warehouse manager, who will determine the best location for the item.
          7. Enter the Web Store Display Name (this corresponds with the name of the listing in the web store)
          8. Enter the Web Description (this corresponds with the item's description in the web store)
          9. Import all related images in the Internet Graphic fields. You can click/drag or copy/paste images.
          10. To get out of Editing mode, click Enter on your keyboard or click out of the description field to remove your cursor.
        `,
        imagePath: '/AllAboutLearning/images/departments/web/filemaker-guide.png',
        imageAlt: 'FileMaker New Record Process'
      },
    'inventory-vs-matrix': {
        title: 'Inventory Items vs. Matrix Items',
        content: `
            An Inventory Item is a single product that is sold one way and one way only. A Matrix Item is a product that gives the customers options to choose from such as color, handing, door 
            thickness, etc.

            Creating a matrix item involves creating the main record, called the "parent," choosing your matrix options, and creating the matrix to generate its sub-items, known as "child" records.
            Matrix items use the same part number with the color code tacked on to the end.
            
            Ex: Creating a matrix item for the part number 9014010 with 3 color options will generate the following child records: 9014010-BL, 9014010-W, and 9014010-BRN.

            Anything that pertains to EVERY Child record, such as the vendor's name, should be entered on 
            the Parent record. Information that is different, such as vendor code or price, should be 
            entered ONLY on each individual Child record.
            
            Anything that comes in a specific color/finish should be set up as a matrix item, NOT an 
            inventory item. Even if we only have 1 option currently, we may order different colors and need 
            to add them eventually. See the section for Creating a Matrix Item.
        `,
        additionalContent: {
          type: 'stacked',
          images: [
            {
              src: '/AllAboutLearning/images/departments/web/inventory-vs-matrix1.png',
              alt: 'Inventory vs Matrix Comparison',
              productUrl: 'https://www.allaboutdoors.com/Handle-Set-Patio-Door-Standard-Handle-Height-Choose-Color',
              caption: 'Item Type Comparison'
            },
            {
              src: '/AllAboutLearning/images/departments/web/inventory-vs-matrix-2.png',
              alt: 'Matrix Structure Example',
              productUrl: 'https://www.allaboutdoors.com/Handle-Set-Sliding-Patio-Door-Extruded-Aluminum-Wood-',
              caption: 'Matrix Structure'
            }
          ]
        }
        },
    'inventory-item': {
    title: 'NetSuite: Creating an Inventory Item',
    content: `
        Initial Setup:
        1. Open FileMaker item record
        2. In NetSuite:
           • Click New Item (paper with plus icon near your name)
           • Select "Inventory Item" (third row, left column)
           • Add to Shortcuts via STAR symbol

        Primary Information Tab:
        1. Item Name/Number: Use FileMaker Inventory Part Number
        2. Units Type: Select "each" or "length"
           • Use same units for stock, purchase, and sale
        3. Display Name Format:
           [Brand Name] [Details] [Item Name], [Handing] - [Color/Finish]
           Example: "Andersen 9-1/2" Split-Arm Casement Operator, Right Hand - Stone"

        Copy Display Name to:
        • Purchasing/Inventory → Purchase Description (remove vendor name)
        • Sales/Pricing → Sales Description
        • Web Store → Web Store Display Name
        • Custom → Web Store Display Name

        Purchasing/Inventory Tab:
        1. Check "Use Bins"
        2. Bin Numbers: Only fill if specifically instructed
        3. Vendors Tab:
           • Add vendor name/code/price
           • Mark as preferred
        4. Update Purchase Description (remove vendor name)

        Web Store Tab Setup:
        1. Basic Settings:
           • Check "Offer Support"
           • Verify Web Store Display Name
           • Create brief description (e.g., "Screen Door Handle Set")

        2. SEO Settings:
           • Page Title: Max 55 characters
           • Prioritize important keywords
           • Exclude minor details like color
           • Alt Text: Max 35 characters (for Image #1)

        3. Images:
           • Path: Web Site Hosting Files → Live Hosting Files → img
           • Add alt text in Associated Images section

        4. Facets (Required):
           • Product Type
           • Brand
           • Color

        5. Categories & Related Items:
           • Add appropriate Commerce Categories
           • Mark primary category as "Preferred"
           • Add related parts from description

        Final Steps:
        1. Save record
        2. Notify Purchasing Manager for pricing
        3. After pricing is set:
           • Return to Edit mode
           • Check "Display in Web Store?"
           • Save changes

        Important Notes:
        • Keep descriptions clear and concise
        • Follow naming conventions exactly
        • Double-check all copied fields
        • Ensure all required facets are added
        • Verify all images are properly uploaded
    `,
    additionalContent: {
        type: 'stacked',
        images: [
            {
                src: '/AllAboutLearning/images/departments/web/inventory-item-guide-1.png',
                alt: 'Creating Inventory Item Guide',
                caption: 'Inventory Item Creation'
            },
            {
                src: '/AllAboutLearning/images/departments/web/inventory-item-guide-2.png',
                alt: 'Inventory Item Details',
                caption: 'Item Details'
            }
        ]
    }
},
    'matrix-item': {
    title: 'NetSuite: Creating a Matrix Item',
    content: `
        What is a Matrix Item?
        • A Matrix Item is a product that gives customers options to choose from such as color, handing, door thickness, etc.
        • Any item that comes in specific colors/finishes should be set up as a matrix item, even if there's currently only one option
        • This allows for future color additions without creating new items

        Converting Inventory Item to Matrix Item:
        1. Remove all inventory (Warehouse Manager)
        2. Modify old record:
           • Add "INACTIVE RECORD" to item number (e.g., 14503 → 14503-INACTIVE RECORD)
           • Check "Inactive" box in System Information Tab
        3. Create new Matrix item with original number

        Creating New Matrix Item:
        1. Initial Setup:
           • Open FileMaker item record
           • In NetSuite, click New Item → Create Matrix Items
           • Add to shortcuts via star icon in blue menu bar

        2. Fill Out Required Tabs:
           • Primary Information
           • Purchasing/Inventory (Purchase Description, "Use Bins", Vendor details)
           • Sales/Pricing (Display Name - will be edited per child record)

        3. Matrix Options Setup:
           • Set Matrix Item Name Template
           • For color-only items: Select colors from dropdown ({itemid}-{custitem_color})
           • For multiple options: Select all options, keep color last
           • For non-color options: Select desired options in vendor-specific order

        4. Custom Tab Configuration:
           • Select all matrix options in Item Options field (use Command/Ctrl for multiple)
           • Enter Web Store Display Name
           • Configure Web Store tab (like Inventory item)
           • Select appropriate color facets for multiple colors

        5. Create and Configure Child Records:
           • Click Create Matrix
           • Verify all needed child records
           • Uncheck unwanted combinations
           • For each child record:
             - Add Vendor Code and Price in Purchasing tab
             - Update Sales Description with actual color
             - Configure Web Store settings

        6. Final Steps:
           • Notify Purchasing Manager for pricing
           • After pricing is set, check "Display in Web Store?"

        Adding Options to Existing Matrix:
        1. Select additional matrix options
        2. Ensure –{custitem_color} is LAST in Name Template
        3. Add new options to Item Options field
        4. Click Add Items (uncheck unavailable options)
        5. For new items:
           • Uncheck "Display in Web Store?"
           • Wait for pricing from purchasing
           • Recheck "Display in Web Store?" after pricing
    `,
    additionalContent: {
        type: 'stacked',
        images: [
            {
                src: '/AllAboutLearning/images/departments/web/matrix-item-guide-1.png',
                alt: 'Creating Matrix Item Guide',
                caption: 'Matrix Item Creation'
            },
            {
                src: '/AllAboutLearning/images/departments/web/matrix-item-guide-2.png',
                alt: 'Matrix Item Configuration',
                caption: 'Matrix Configuration'
            }
        ]
    }
},
'commerce-categories': {
    title: 'NetSuite: Guide to Commerce Categories',
    content: `
        What are Commerce Categories?
        • Hierarchical structure for organizing products
        • Creates product categories and subcategories
        • Allows multiple parent-child relationships
        • Enables flexible category management

        Accessing Commerce Categories:
        1. Navigate to: Commerce > Content Management > Catalog & Categories > Commerce Categories > New
           OR
           Use Commerce Categories from drop-down menu

        2. Filtering & Finding Categories:
           • Click "+" next to "Filters"
           • Select Primary Parent from dropdown
           • Search with Command/Ctrl + F
           • Categories start with "catalog - "

        Creating/Editing Categories:
        1. Basic Information:
           • Name: Format as "[Brand] [Product Line] [Application] [Specifics]"
           • Description: Brief subtitle with additional details
           • Display in Website: Yes/No

        2. SEO Settings:
           • Page Title Format: "[Category Name] | All About Doors & Windows"
           • Character Limit: Aim for 55 characters
           • Example: "HOPPE HLS 7 Multipoint Handle Sets | All About Doors & Windows"

        3. Images:
           Upload Process:
           • Go to Documents > Files > File Cabinet
           • Navigate to: Web Site Hosting Files : Live Hosting Files : images
           • Click Add File
           • Select image from computer
           • Add Alt Tag (limit: 199 characters)
           • Click Save

        4. Detailed Description:
           • Appears below category name
           • Above items/sub-categories
           • Supports HTML elements
           • Can include images and links

        Managing Subcategories:
        1. Organization:
           • Add/remove subcategories
           • Reorder using menu options (up/down/top/bottom)
           • Override names/descriptions for specific parents

        2. Item Management:
           • Add items by part number
           • Remove items as needed
           • Reorder items within category
           • Maintain category structure

        Best Practices:
        • Use consistent naming conventions
        • Keep descriptions clear and concise
        • Optimize SEO titles
        • Maintain logical hierarchy
        • Regular category review and updates
        • Ensure all images have alt text
        • Verify parent-child relationships
    `,
    additionalContent: {
        type: 'stacked',
        images: [
            {
                src: '/AllAboutLearning/images/departments/web/commerce-categories-1.png',
                alt: 'Commerce Categories Structure',
                caption: 'Category Management'
            },
            {
                src: '/AllAboutLearning/images/departments/web/commerce-categories-2.png',
                alt: 'Category Configuration',
                caption: 'Category Setup'
            }
        ]
    }
},

'navigating-the-warehouse': {
    title: 'Navigating the Warehouse',
    content: `
        Warehouse Layout Overview:
        • Rows A-N arranged alphabetically (left to right)
        • Special Areas:
          - East Wall: Randy's domain (Surrounds and Door Light Windows)
          - West Wall: Weatherstrip, door sweeps, glazing bead
          - MP Area: Multipoint locks
          - Blem Racks: Two racks with miscellaneous items

        Bin Number System:
        Format Example: A7-E1

        1. Row Location (First Letter):
           • Represents warehouse row (A-N)
           • Found on floor labels
           • Example: A7-E1 is in Row A

        2. Rack Number (Number after Row):
           • Organized numerically within row
           • Example: A7-E1 is on rack #7

        3. Shelf Letter (Letter after Dash):
           • Organized alphabetically bottom to top
           • Example: A7-E1 is on shelf E

        4. Box Position (Number after Shelf):
           • Organized left to right
           • Example: A7-E1 is in position 1

        Navigation Steps:
        1. Find correct row (A-N) from entrance
        2. Locate rack number within row
        3. Find shelf letter (bottom to top)
        4. Count box positions left to right

        Special Areas:
        1. Blem Racks:
           • Two separate racks (Blem Rack 1 and 2)
           • Items arranged randomly
           • Requires manual search

        Best Practices:
        • Verify complete bin number
        • Follow alphabetical/numerical order
        • Check special areas when needed
        • Confirm rack locations
        • Double-check shelf positions
    `,
    additionalContent: {
        type: 'stacked',
        images: [
            {
                src: '/AllAboutLearning/images/departments/web/navigate-warehouse.png',
                alt: 'Warehouse Layout Overview',
                caption: 'Warehouse Layout'
            },
            {
                src: '/AllAboutLearning/images/departments/web/bin-system.png',
                alt: 'Bin Numbering System',
                caption: 'Bin System Guide'
            }
        ]
    }
},
};

  

  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    
    const normalizedQuery = query.toLowerCase()
      .replace(/-/g, '') // Remove hyphens
      .replace(/\s+/g, '') // Remove spaces
      .replace(/[.,]/g, ''); // Remove periods and commas

    const results = searchIndex.filter(item => {
      const normalizedTitle = (item.title || '').toLowerCase()
        .replace(/-/g, '')
        .replace(/\s+/g, '')
        .replace(/[.,]/g, '');
      const normalizedDescription = (item.description || '').toLowerCase()
        .replace(/-/g, '')
        .replace(/\s+/g, '')
        .replace(/[.,]/g, '');
      const normalizedDetails = (item.details || '').toLowerCase()
        .replace(/-/g, '')
        .replace(/\s+/g, '')
        .replace(/[.,]/g, '');

      return (
        normalizedTitle.includes(normalizedQuery) ||
        normalizedDescription.includes(normalizedQuery) ||
        normalizedDetails.includes(normalizedQuery)
      );
    });

    setSearchResults(results);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <StaggeredFadeIn delay={0}>
        

        <BreadcrumbTrail />

        {/* Flex container for title and search bar */}
        <Box
          sx={{
            mb: 1,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: { xs: 'wrap', md: 'nowrap' },
            gap: 2,
          }}
        >
          <Box sx={{ width: 1, mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 2,
                pb: 0,
                borderBottom: '3px double #4bac52',
                mb: 2
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  color: 'black',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '2.7rem',
                  fontWeight: 500,
                  mb: 1,
                  lineHeight: 1.5
                }}
              >
                Web Department Training Guide
              </Typography>

              <SearchBar 
                onSearch={handleSearch}
                sx={{
                  backgroundColor: '#f1f8e9',
                  border: '1.5px solid #4bac52',
                  borderRadius: '8px',
                  boxShadow: 'none',
                  color: 'black',
                  minWidth: '320px',
                  alignSelf: 'flex-start',
                  mt: .5,
                  mb: 4,
                  '& input': {
                    color: 'black',
                    fontFamily: 'Roboto, sans-serif',
                  },
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Search Results Display */}
        {searching && (
          <Box sx={{ mt: 2, mb: 2 }}>
            {searchResults.length > 0 ? (
              <Paper sx={{ p: 2, backgroundColor: '#f1f8e9', border: '1px solid #4bac52' }}>
                <Typography variant="subtitle1" sx={{ mb: 2, color: 'black', fontWeight: 500 }}>
                  Search Results:
                </Typography>
                <Grid container spacing={3} maxWidth="lg">
                  {searchResults.map((result, idx) => (
                    <Grid item xs={12} md={6} key={result.title}>
                      <Box
                        sx={{
                          height: '100%',
                          p: 3,
                          borderRadius: 2,
                          backgroundColor: '#fff',
                          border: '1px solid #e0e0e0',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 1,
                          '&:hover': { 
                            backgroundColor: '#e8f5e9',
                            transform: 'translateY(-2px)',
                            transition: 'all 0.2s ease-in-out',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                          }
                        }}
                        onClick={() => {
                          if (result.type === 'video') {
                            navigate(result.path);
                            setTimeout(() => {
                              const videoElement = document.getElementById(result.videoId);
                              if (videoElement) {
                                videoElement.scrollIntoView({ 
                                  behavior: 'smooth',
                                  block: 'center'
                                });
                                videoElement.style.transition = 'all 0.3s ease-in-out';
                                videoElement.style.boxShadow = '0 0 20px rgba(75, 172, 82, 0.5)';
                                setTimeout(() => {
                                  videoElement.style.boxShadow = 'none';
                                }, 2000);
                              }
                            }, 500);
                          } else {
                            navigate(result.path);
                          }
                        }}
                      >
                        <Box sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 1
                        }}>
                          <Box sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: result.type === 'video' 
                              ? '#ff4444' 
                              : result.type === 'document' 
                              ? '#4bac52'
                              : '#2196f3',
                            fontSize: '2rem'
                          }}>
                            {result.type === 'video' ? (
                              <VideoLibraryIcon sx={{ fontSize: 'inherit' }} />
                            ) : result.type === 'document' ? (
                              <ArticleIcon sx={{ fontSize: 'inherit' }} />
                            ) : (
                              <MenuBookIcon sx={{ fontSize: 'inherit' }} />
                            )}
                          </Box>
                          <Typography variant="h6" sx={{ 
                            color: result.type === 'video' 
                              ? '#ff4444' 
                              : result.type === 'document' 
                              ? '#4bac52'
                              : '#2196f3',
                            fontWeight: 600,
                            fontSize: '1rem',
                            flexGrow: 1
                          }}>
                            {result.title}
                          </Typography>
                        </Box>
                        <Typography sx={{ 
                          color: 'black',
                          fontSize: '0.9rem',
                          flexGrow: 1
                        }}>
                          {result.description}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            ) : (
              <Paper sx={{ p: 2, backgroundColor: '#fffbe6', border: '1px solid #ffe082' }}>
                <Typography sx={{ color: '#b71c1c' }}>No results found.</Typography>
              </Paper>
            )}
          </Box>
        )}

        <Typography variant="body1" sx={{ 
            fontSize: '1.1rem',
            mb: 3,
            maxWidth: '1100px',
            fontFamily: 'Roboto, sans-serif',
            lineHeight: 1.6
        }}>
            Welcome to the All About Doors & Windows Web Department Training Guide! This resource provides comprehensive information about managing our online presence, from product listings and images to category organization and system navigation. See our key principles below that guide our work and ensure customer satisfaction.
        </Typography>

        <Box sx={{
            backgroundColor: 'rgba(75, 172, 82, 0.05)',  // Light green background
            borderRadius: 2,
            border: `1px solid ${theme.palette.primary.main}`,
            p: 3,
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Optional decorative element */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '4px',
                height: '100%',
                backgroundColor: theme.palette.primary.main
            }} />

            <Typography variant="h6" sx={{ 
                mb: 2,
                fontFamily: 'Roboto, sans-serif',
                color: theme.palette.primary.main,
                fontWeight: 500
            }}>
                Our Key Principles
            </Typography>

            <Box sx={{ pl: 1 }}>
                <ul style={{ 
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                }}>
                    {[
                        { title: 'Product Clarity', desc: 'Providing detailed, accurate information so customers make confident purchasing decisions' },
                        { title: 'Accuracy', desc: 'Maintaining precise product data and specifications to prevent ordering errors' },
                        { title: 'Recommendations', desc: 'Suggesting complementary products to enhance customer solutions and increase sales' },
                        { title: 'Timely Support', desc: 'Delivering fast, knowledgeable assistance to minimize customer wait times' },
                        { title: 'Satisfaction', desc: 'Ensuring customer satisfaction leads to repeat business and referrals' }
                    ].map((item, index) => (
                        <li key={index} style={{ 
                            marginBottom: index === 4 ? 0 : '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <CheckCircle sx={{ 
                                color: theme.palette.primary.main,
                                fontSize: '1.1rem'
                            }} />
                            <span>
                                <strong>{item.title}</strong> - {item.desc}
                            </span>
                        </li>
                    ))}
                </ul>
            </Box>
        </Box>
            <Divider 
                sx={{ 
                    mb: 4,
                    borderColor: theme.palette.primary.main,
                    borderWidth: .5
                }} 
                />

                <Card 
                sx={{ 
                    mb: 6,
                    backgroundColor: 'black',
                    border: `1px solid ${theme.palette.primary.main}`,
                    p: 3
                }}
                >
                <Box
                    onClick={() => setIsExpanded(!isExpanded)}
                    sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    mb: 2
                    }}
                >
                    <Typography 
                    variant="h6" 
                    sx={{ 
                        color: theme.palette.primary.main,
                        textAlign: 'center',
                        fontWeight: 600
                    }}
                    >
                    Table of Contents
                    </Typography>
                    <Box sx={{ 
                    position: 'absolute',
                    right: 0,
                    color: theme.palette.primary.main,
                    transition: 'transform 0.3s ease'
                    }}>
                    {isExpanded ? <ExpandLess /> : <ExpandMore />}
                    </Box>
                </Box>

                {/* Table of Contents Sections */}

                <Collapse in={isExpanded}>
                    <Grid container spacing={2}>
                    {sections.map((section, index) => (
                        <Grid item xs={12} sm={6} md={4} key={section.id}>
                        <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                            <Box
                            component="a"
                            href={`#${section.id}`}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                p: 2,
                                backgroundColor: 'background.paper',
                                border: `1px solid ${theme.palette.primary.main}`,
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                textDecoration: 'none',
                                height: '100%',
                                '&:hover': {
                                transform: 'translateY(-4px)',
                                backgroundColor: 'rgba(75, 172, 82, 0.1)',
                                boxShadow: 3,
                                '& .icon': {
                                    transform: 'scale(1.2)',
                                },
                                '& .title': {
                                    color: theme.palette.primary.main,
                                }
                                }
                            }}
                            >
                            <Box
                                className="icon"
                                sx={{
                                color: theme.palette.primary.main,
                                mb: 2,
                                fontSize: '2rem',
                                transition: 'transform 0.3s ease',
                                p: 1,
                                borderRadius: '50%',
                                backgroundColor: 'rgba(75, 172, 82, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 60,
                                height: 60
                                }}
                            >
                                {sectionIcons[section.id]}
                            </Box>
                            <Typography
                                className="title"
                                sx={{
                                color: 'white',
                                textAlign: 'center',
                                transition: 'color 0.3s ease',
                                fontSize: '1rem',
                                fontWeight: 500
                                }}
                            >
                                {section.title}
                            </Typography>
                            </Box>
                        </Zoom>
                        </Grid>
                    ))}
                    </Grid>
                </Collapse>
                </Card>

        {/* Content Sections */}
        {sections.map((section) => (
            <Box key={section.id} id={section.id} sx={{ mb: 6 }}>
                <Divider 
                sx={{ 
                    my: 4, 
                    borderColor: theme.palette.primary.main,
                    '&::before, &::after': {
                    borderColor: theme.palette.primary.main,
                    }
                }}
                >
                <Typography 
                    variant="h1"  // You can use h4, h5, h6, etc.
                    sx={{ 
                        color: theme.palette.primary.main, 
                        px: .9,
                        fontSize: { 
                            xs: '1rem',  // Size for extra small screens
                            sm: '1.1rem',  // Size for small screens
                            md: '1.2rem'   // Size for medium and up screens
                        },
                        fontWeight: 500   // Optional: adjust font weight
                          // Optional: make text uppercase
                    }}
                >
                    {sectionContent[section.id].title}
                </Typography>
                </Divider>

                <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{ 
                            p: 3,
                            border: '1px solid black',
                            borderRadius: '2px',
                            backgroundColor: '#faf9f6',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            height: '100%',
                            minHeight: '700px',      // Added minimum height
                            maxHeight: '700px',      // Added maximum height
                            overflowY: 'auto'  
                        }}
                    >
                        <Typography 
                            sx={{ 
                                color: 'black', 
                                lineHeight: 2,
                                whiteSpace: 'pre-line',  // This preserves formatting
                                fontSize: '1.1rem',     // Adjust font size (you can change this value)
                                fontFamily: 'Roboto, sans-serif'
                            }}
                        >
                            {sectionContent[section.id].content}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper 
                        elevation={3}
                        sx={{ 
                            p: 2,
                            border: `1px solid ${theme.palette.primary.main}`,
                            backgroundColor: '#faf9f6',
                            position: 'relative',
                            
                        }}
                    >
                    {sectionContent[section.id].additionalContent?.type === 'comparison' ? (
                        <Grid container spacing={2}>
                        {sectionContent[section.id].additionalContent.images.map((image, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                            <Box 
                                sx={{ 
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%'
                                }}
                            >
                                <Box
                                sx={{
                                    flex: 1,
                                    minHeight: '400px',
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    borderRadius: '4px',
                                    p: 2,
                                    backgroundColor: '#fff'
                                }}
                                >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    style={{ 
                                    width: '100%',
                                    height: '90%',
                                    objectFit: 'contain',
                                    }}
                                />
                                </Box>
                                <Typography 
                                align="center" 
                                sx={{ 
                                    mt: 1,
                                    color: theme.palette.primary.main,
                                    fontWeight: 500,
                                    fontSize: '1.1rem'
                                }}
                                >
                                {image.caption}
                                </Typography>
                            </Box>
                            </Grid>
                        ))}
                        </Grid>
                        ) : sectionContent[section.id].additionalContent?.type === 'stacked' ? (
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                  <Box>
                                    <Typography 
                                        variant="h6" 
                                        sx={{ 
                                        color: '#4bac52',
                                        mb: 2,
                                        textAlign: 'center',
                                        fontWeight: 500
                                        }}
                                    >
                                        
                                    </Typography>
                                    <Box
                                        sx={{
                                        width: '100%',
                                        backgroundColor: '#fff',
                                        border: '2px solid #4bac52',
                                        borderRadius: '8px',
                                        p: 3,
                                        minHeight: '300px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        overflow: 'hidden',
                                          backgroundColor: '#fff',
                                          cursor: 'pointer',
                                          transition: 'transform 0.3s ease-in-out', // Transition for the whole box
                                          '&:hover': {
                                            transform: 'scale(1.2)', // Entire box zooms to 102%
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)', // Optional: adds shadow on hover
                                          }
                                        }}
                                      >

                                        <a 
                                                href={sectionContent[section.id].additionalContent.images[0].productUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()} // Prevents interference with other click handlers
                                                style={{ 
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    width: '100%',
                                                    height: '100%'
                                                }}
                                            >

                                        <img
                                        src={sectionContent[section.id].additionalContent.images[0].src}
                                        alt={sectionContent[section.id].additionalContent.images[0].alt}
                                        style={{ 
                                            width: '100%',
                                            height: 'auto',
                                            maxHeight: '250px',    // Increased from 250px
                                            maxWidth: '100%',       // Added to ensure some padding
                                            objectFit: 'contain',
                                            padding: '1px'   
                                            
                                        }}
                                        />
                                        </a>
                                    </Box>
                                    </Box>

                                    {/* Second Box - Category Layout */}
                                    <Box>
                                    <Typography 
                                        variant="h6" 
                                        sx={{ 
                                        color: '#4bac52',
                                        mb: 2,
                                        textAlign: 'center',
                                        fontWeight: 500
                                        }}
                                    >
                                        
                                    </Typography>
                                    <Box
                                        sx={{
                                        width: '100%',
                                        backgroundColor: '#fff',
                                        border: '2px solid #4bac52',
                                        borderRadius: '8px',
                                        p: 3,
                                        minHeight: '300px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        overflow: 'hidden',
                                          backgroundColor: '#fff',
                                          cursor: 'pointer',
                                          transition: 'transform 0.3s ease-in-out', // Transition for the whole box
                                          '&:hover': {
                                            transform: 'scale(1.2)', // Entire box zooms to 102%
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)', // Optional: adds shadow on hover
                                          }
                                        }}
                                      >

                                        <a 
                                                href={sectionContent[section.id].additionalContent.images[1].productUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()} // Prevents interference with other click handlers
                                                style={{ 
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    width: '100%',
                                                    height: '100%'
                                                }}
                                            >
                                        <img
                                        src={sectionContent[section.id].additionalContent.images[1].src}
                                        alt={sectionContent[section.id].additionalContent.images[1].alt}
                                        style={{ 
                                            width: '100%',
                                            height: 'auto',
                                            maxHeight: '250px',
                                            objectFit: 'contain'
                                        }}
                                        />
                                        </a>
                                    </Box>
                                    </Box>
                                </Box>
                    ) : section.id === 'descriptions' ? (
                        <Box
                        sx={{
                            width: '100%',
                            minHeight: '300px',
                            position: 'relative',
                            '&:hover': {
                            '& .zoom-image': {
                                transform: 'scale(1.05)',
                            },
                            '& .hover-overlay': {
                                opacity: 1,
                            }
                            }
                        }}
                        >
                        <Box
                            sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            cursor: 'pointer'
                            }}
                            onClick={() => {
                                if (sectionContent[section.id].productUrl) {
                                  window.open(sectionContent[section.id].productUrl, '_blank', 'noopener,noreferrer');
                                } else {
                                  console.warn('No product URL specified for this section');
                                }
                              }}
                        >
                            <img
                            src={sectionContent[section.id].imagePath}
                            alt={sectionContent[section.id].imageAlt}
                            className="zoom-image"
                            style={{ 
                                width: '100%',
                                height: '100%',
                                border: `2px solid ${theme.palette.primary.main}`,
                                borderRadius: '6px',
                                objectFit: 'contain',
                                padding: '16px',
                                transition: 'transform 0.3s ease-in-out'
                            }}
                            />
                            <Box
                            className="hover-overlay"
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0,
                                transition: 'opacity 0.3s ease-in-out'
                            }}
                            >
                            <Tooltip title="View on website">
                                <IconButton
                                sx={{
                                    backgroundColor: theme.palette.primary.main,
                                    color: 'white',
                                    '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                    }
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (sectionContent[section.id].productUrl) {
                                      window.open(sectionContent[section.id].productUrl, '_blank', 'noopener,noreferrer');
                                    } else {
                                      console.warn('No product URL specified for this section');
                                    }
                                  }}
                                >
                                <OpenInNewIcon />
                                </IconButton>
                            </Tooltip>
                            </Box>
                        </Box>
                        </Box>

                            ) : section.id === 'guidelines' ? (
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {/* First Section - Color Codes */}
                                <Paper 
                                    elevation={3}
                                    sx={{ 
                                    p: 3,
                                    backgroundColor: '#fff',
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    }}
                                >
                                    <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ p: 2 }}>
                                        <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 2 }}>
                                            Color Code Guidelines
                                        </Typography>
                                        <Typography sx={{ mb: 2 }}>
                                            The image to the right displays color code used throughout the website.
                                        </Typography>
                                        <Typography sx={{ mb: 1 }}>
                                            Can be used on multiple occasions, including:
                                        </Typography>
                                        <Box sx={{ pl: 2 }}>
                                            <Typography>• Product descriptions</Typography>
                                            <Typography>• Category pages</Typography>
                                        </Box>
                                        <Typography sx={{ mt: 2, fontWeight: 500 }}>
                                            Remember to Check all information entered is correct before publishing.
                                        </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box
                                        sx={{
                                            border: '2px solid #4bac52',
                                            borderRadius: '8px',
                                            p: 2,
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center'
                                        }}
                                        >
                                        <Typography 
                                            variant="h6" 
                                            sx={{ 
                                            color: '#4bac52',
                                            mb: 2,
                                            textAlign: 'center'
                                            }}
                                        >
                                            
                                        </Typography>
                                        <img
                                            src={sectionContent[section.id].additionalContent.images[0].src}
                                            alt={sectionContent[section.id].additionalContent.images[0].alt}
                                            style={{ 
                                            width: '100%',
                                            height: 'auto',
                                            maxHeight: '400px',
                                            objectFit: 'contain'
                                            }}
                                        />
                                        </Box>
                                    </Grid>
                                    </Grid>
                                </Paper>
                            
                                {/* Second Section - Category Layout */}
                                <Paper 
                                    elevation={3}
                                    sx={{ 
                                    p: 3,
                                    backgroundColor: '#fff',
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    }}
                                >
                                    <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ p: 2 }}>
                                        <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 2 }}>
                                            Blemished Item Guidelines
                                        </Typography>
                                        <Typography sx={{ mb: 2 }}>
                                            Follow these general guidelines when creating a blemished item:
                                        </Typography>
                                        <Box sx={{ pl: 2 }}>
                                            <Typography sx={{ mb: 1 }}>
                                            • Add "-BLEM" to the end of the item number (123456-BLEM)
                                            </Typography>
                                            <Typography sx={{ mb: 1 }}>
                                            • Only create records for blemished items in NetSuite, NOT FileMaker
                                            </Typography>
                                            <Typography>
                                            • Use a photo of the actual blemished item as the first image to avoid
                                            looking identical to the new items. Circle the blemishes in red if they aren't
                                            obvious.
                                            </Typography>
                                        </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box
                                        sx={{
                                            border: '2px solid #4bac52',
                                            borderRadius: '8px',
                                            p: 2,
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center'
                                        }}
                                        >
                                        <Typography 
                                            variant="h6" 
                                            sx={{ 
                                            color: '#4bac52',
                                            mb: 2,
                                            textAlign: 'center'
                                            }}
                                        >
                                            Category Layout Example
                                        </Typography>
                                        <img
                                            src={sectionContent[section.id].additionalContent.images[1].src}
                                            alt={sectionContent[section.id].additionalContent.images[1].alt}
                                            style={{ 
                                            width: '100%',
                                            height: 'auto',
                                            maxHeight: '400px',
                                            objectFit: 'contain'
                                            }}
                                        />
                                        </Box>
                                    </Grid>
                                    </Grid>
                                </Paper>
                                </Box>
                                ) : section.id === 'filemaker' ? (
                                    <Box
                                      sx={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        p: 1, // Padding around the inner box to give space for zoom
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          width: '100%',
                                          height: '400px',
                                          display: 'flex',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          border: `2px solid ${theme.palette.primary.main}`,
                                          borderRadius: '6px',
                                          overflow: 'hidden',
                                          backgroundColor: '#fff',
                                          cursor: 'pointer',
                                          transition: 'transform 0.3s ease-in-out', // Transition for the whole box
                                          '&:hover': {
                                            transform: 'scale(1.5)', // Entire box zooms to 102%
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)', // Optional: adds shadow on hover
                                          }
                                        }}
                                      >
                                        <img
                                          src={sectionContent[section.id].imagePath}
                                          alt={sectionContent[section.id].imageAlt}
                                          style={{ 
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                            padding: '20px',
                                          }}
                                        />
                                      </Box>
                                    </Box>
                                    
                    ) : sectionContent[section.id].imagePath ? (
                        // Regular image display for other sections
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {/* First Image */}
                            <Box
                                sx={{
                                    flex: 1,
                                    height: '500px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    borderRadius: '5px',
                                    overflow: 'hidden',
                                    backgroundColor: '#f5f5f5',
                                    '&:hover': {
                                        '& .zoom-image': {
                                            transform: 'scale(1.75)',
                                        }
                                    }
                                }}
                            >
                                <img
                                    className="zoom-image"
                                    src={sectionContent[section.id].imagePath}
                                    alt={sectionContent[section.id].imageAlt}
                                    style={{ 
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain',
                                        padding: '16px',
                                        transition: 'transform 0.3s ease-in-out',
                                        cursor: 'zoom-in'
                                    }}
                                />
                            </Box>
                            {/* Second Image */}
                            <Box
                                sx={{
                                    flex: 1,
                                    height: '500px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    borderRadius: '4px',
                                    overflow: 'hidden',
                                    backgroundColor: '#f5f5f5',
                                    '&:hover': {
                                        '& .zoom-image': {
                                            transform: 'scale(1.75)',
                                        }
                                    }
                                }}
                            >
                                <img
                                    className="zoom-image"
                                    src={sectionContent[section.id].imagePath2}
                                    alt={sectionContent[section.id].imageAlt2}
                                    style={{ 
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain',
                                        padding: '16px',
                                        transition: 'transform 0.3s ease-in-out',
                                        cursor: 'zoom-in'
                                    }}
                                />
                            </Box>
                        </Box>
                        
                    ) : (
                        <Box
                            sx={{
                            width: '100%',
                            height: '500px',
                            backgroundColor: 'rgba(75, 172, 82, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '4px',
                            border: `1px solid ${theme.palette.primary.main}`
                            }}
                        >
                            <Typography sx={{ color: theme.palette.primary.main }}>
                            [Image placeholder for {section.title}]
                            </Typography>
                        </Box>
                        )}
                        </Paper>
                    </Grid>
                    </Grid>
                </Box>
                ))}
            </StaggeredFadeIn>
            
            {/* Back to Top Button */}
            <Zoom in={showScroll}>
                <Fab 
                    color="primary" 
                    size="medium"
                    onClick={scrollToTop}
                    sx={{
                        position: 'fixed',
                        bottom: 24,    // Increased from 16 to 24 for better spacing
                        right: 24,     // Increased from 16 to 24 for better spacing
                        backgroundColor: '#4bac52',
                        width: 58,     // Added explicit width
                        height: 58,    // Added explicit height
                        '&:hover': {
                            backgroundColor: '#3d8a42'
                        }
                    }}
                    aria-label="scroll back to top"
                >
                    <KeyboardArrowUpIcon sx={{ fontSize: '2rem' }} />
                </Fab>
            </Zoom>
        </Container>
    );
}

export default WebDepartment;