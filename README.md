# Project 1 : Zayo
Welcome come to our Zayo project page :smile::raised_hands:. All the visualizations are based on D3 (**version 4**).

## Catalog
* [Team members & Contributions](#Team members and contributions)
* [How to run](#How to run)
* [Information used](#Information used)
* [Design Process](#Design Process)
* [Checking List](#Checking List)
* [Unique Visualizations](#Unique Visualizations)
    * [Visualization 1 : Map and Filter](#Visualization 1: Map and Filter)
    * [Visualization 2: Monthly Revenue and CPQ Analysis](#Visualization 2: Monthly Revenue and CPQ Analysis)
    * [Visualization 3: Revenue Analysis](#Visualization 3: Revenue Analysis)
    * [Visualization 4: Group Performance Analysis](#Visualization 4: Group Performance Analysis)
    * [Visualization 5: Tabular Exploration](#Visualization 5: Tabular Exploration)
    * [Visualization 6: Not used](#Visualization 6: Not used)
* [References](#References)

## Team members and contributions
* Paige Johnson:
	* Participate in conceptualizing the visualizations
	* 6th Visualization
	* Documentation
* Xiaolei Huang:
	* Data Preprocessing: wrote python script to extract and calculate data from multiple tables.
	* Participate in building visualization for 3rd & 4th Visualizations.
	* Documentation: wrote and formatted markdown documentations.
* Camille Owens:
	* Worked on the scatter plot.
	* Helped with conceptualizing the visualizations.
	* Documentation.
* Linzi Xing:
	* 1st & 5th Visualization & Dashboard
	* Data Preprocessing
	* Documentation
* Hayeong Song:
	* Data Preprocessing: wrote python script to extract certain attributes and change the format so that it can used for visualization
	* 2nd Visuzalization
	* Documentation

## How to run
* Start sever
```bash
http-server -p 8088
```
or
```bash
python -m SimpleHTTPServer 8081
```

## Information Used
**We convert csv file to tsv file to avoid splitting error raised by commas in “numbers”. The tables we used are listed below: **
1. ZayoHackathonData_Buildings.csv and tsv:
Latitude and Longitude are used to locate buildings on the map. Street Address, City and Postal Code are visualized as tooltips. Market is used to filter map and analyze the customer distribution.
1. ZayoHackathonData_Accounts.csv:
Relation between Industry and Annual Revenue are visualized as Visualization 3. From relations between these two attributes, we can know which industries make more annual revenue and clients from these industries are more likely to be the potential target customers.
1. ZayoHackathonData_CPQs.csv
In this dataset, X36 NPV List is used and visualized in Visualization 2
1. ZayoHackathonData_Services.csv
We evaluate efficiency of each product group. We sum revenue for each group and create a bubble chart based on the results.
## Design Process
At the beginning of the project, our team analyzed the dataset Zayo provided together according to the the problem Zayo came up with, and decided the goal of this project was helping Zayo group to pick the most important features can be used to detect the  potential target customers.

After reading the dataset. We found the customer detection can be contributed by two different views - spatial and non-spatial. For spatial part, visualization design is kinda easy since we have latitude and longitude. Usually more customers in an area means more probability to extract quality customers. And all the attributes should be included in spatial visualization are all in the same table so no data pre-processing need in this part. We also notice that the money based attributes like annual revenue, MRR, and total benefit over time are the directest factors to evaluate customer’s value. Also, which product group in Zayo is the busiest can indicate what demand is the most popular. The relation between customers’ industries and stage they are on can indicate which industry these clients come from most possibly. However, some of these features are located in different sets. Here we adopted the data pre-processing to combine these features into one dataset using Python script. Since the customer prediction is mainly based on three markets, so we also filtered out the data not in these three areas.

Then, we separated the project into several parts. And each part was assigned to one or more people. To avoid overlap design, we checked the project process at the end of each day to make sure everyone on the same page. The visualizations we chose are all very basic but have interesting interactions like for map and table, they can both be filtered by market filter, and for annual revenue, when clicking an industry, the arc of this industry will be filtered out, in this way, some industries’ arcs won’t be squeezed together.

Finally, we combined all these visualizations into a systematic **dashboard**. Although our visualizations cannot output a list of predicted target customers directly. After analyzing all these visualizations jointly. Some customer’s features can be proved meaningful for prediction process.

## Checking List
- [x] Include a README.md file
- [x] Include at least three unique visualizations: we have 6.
- [x] Be able to work with any dataset of this format: automatically either read from CSV file or provided by python scripts.
- [x] Dashboarding: Show all three visualizations as part of the same screen.
- [x] Provide more than three visualizations: We provide 6 unique visualizations.
- [x] Dynamic Queries: We utilized filters (Map and Pie charts) to allow dynamic transitions and changing.
- [x] Missing Data: plz check python scripts in `utils` folder. We handle missing data in python scripts.
- [x] Coordinated Views: Visualization 5: Tabular Exploration can be dynamically changed by updating Visualization 1 : Map and Filter.
- [x] Overview+Detail: The visualizations start with overview perspective. We build filters to allow users to check details. For the map, it allows users to zoom in or out.
- [x] Style: We used each panel to show different visualization. Each panel shares the same style. For example,  there is a panel that shows filter visualization and panel that shows analysis of the revenue.

## Unique Visualizations
### Visualization 1: Map and Filter

The first visualization is combined by two parts -  Map and filter. For the map, we visualize the locations of each account with steel blue dots. It is easy to tell almost all of customers are clustered around three main markets which are Denver, Atlanta and Dallas. Because there is possibility that one building may contain several customers. So we set the opacity of dots to represent how many users in this building. When hovering on each dot, tooltip includes the building address, city and postal code will show. The donut-looking filter beside the map is used to filter the dots on the map based on markets. When change selection by filter, the map will zoom to the most appropriate level.

### Visualization 2: Monthly Revenue and CPQ Analysis

The first visualization represented how much monthly revenue was received from the three states, Colorado, Texas and Georgia. We used a barchart to represent this data. According to the data and visualization Atlanta makes the biggest monthly revenue out of 3 states. And Dallas scores the 2nd. The 2nd bar chart shows the relationship between Industry and CPQ. In data file I used “X36 NPV List” attribute as it is the sum of “X36 MRC List” and “X36 NPV List”. And with this data the visualization represents CPQ by each industry. And the Telecommunication has the highest CPQ out of all the industries. 2nd and 3rd IT Infrastructure and Finance respectively. Other industries besides top 3 are mostly low in CPQ.


### Visualization 3: Revenue Analysis

This visualization represented how much revenue is generated by each industry. We thought it was best to use a pie chart because it would be the best way to visualize which industry was more profitable. When you click on a color on the pie chart it corresponds to one industry. When you click on the color desired it tells you what industry it is, how much they made in a year and based on how much it is used compared to the other industries using a percentage.

### Visualization 4: Group Performance Analysis

This part represented the different networks used by Zayo. Each circle represented a different network and the size of the circle corresponded to how much income was made each month. Therefore, larger the circle the more income there is. Once the circle is clicked, it enlarges the circle, and it tells you which network it is and how much income it had made.

### Visualization 5: Tabular Exploration
This is a table looking visualization. It shows Building ID, Account ID, StageName, Market and Industry in the record format. This table can also be filtered by the map market filter. According to this part, we can see the distribution of StageName and Industry on different market. For example, if we see that for Denver, most of accounts are on success stage, it may indicate that this market has more potential target customers. Or for Dallas, customers in Telecom industry are the most, and based on other visualizations, Telecom customers can provide the most benefits, then it may also indicate more target clients are in this area.

### Visualization 6: Not used



We did not incorporate this visualization because it was not valuable information. We learned that proximity networking in Colorado was more expensive than the other two States. The price was expensive with large buildings (e.g. hospitals) with On Zayo Networks but overall, as the graph shows it was linear because the more proximity you need, the more expensive it will be to build.

## References
* For the bootstrap page:
[Bootstrap CSS](http://getbootstrap.com/css/)
[Bootstrap Components](http://getbootstrap.com/components/)
[Bootstrap Javascript](http://getbootstrap.com/javascript/)
*  For the 3rd Visualization: [d3-js-step-by-step](https://github.com/zeroviscosity/d3-js-step-by-step/blob/master/step-6-animating-interactivity.html)
* For the 4th Visualization: [Nau Technologies Stack](https://naustud.io/tech-stack/)
* For the 2nd Visualization : [Simple d3.js barchart](http://bl.ocks.org/d3noob/8952219)
* For the 1st Visualization:
[dcjs-leaflet-untappd](https://github.com/austinlyons/dcjs-leaflet-untappd);
[leaflet Map](http://leafletjs.com/)(http://viz.hedaro.com/);
[dc.js PieChart](https://github.com/dc-js/dc.js/blob/master/web/examples/pie.html)
* For the 5th Visualization:
[dc.js DataTable](https://dc-js.github.io/dc.js/docs/html/dc.dataTable.html)
