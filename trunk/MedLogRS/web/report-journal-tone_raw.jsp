<%-- 
    Document   : report-journal-tone_raw
    Created on : Dec 9, 2016, 7:44:46 AM
    Author     : westy
--%>

<%@page import="com.medlog.webservice.rest.helpers.ServletHelpers"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<jsp:useBean id="user" class="com.medlog.webservice.vo.PatientVO" scope="session" />
<jsp:setProperty name="user" property="*"/> 
<%
    String data = "";
    String area = "";
    String tbl = "";
    String fiveNum = "";
    String eq = "";
    String currentDiary = "";
    String currentDiaryCSV = "";
    String descSuff = "";
    ServletHelpers sh = new ServletHelpers(request, response);
    data = sh.getStrAttribute("diaryReportData", "[]");
    tbl = sh.getStrAttribute("diaryTbl", "");
    area = sh.getStrAttribute("diaryAreaData", "[]");
    fiveNum = sh.getStrAttribute("fiveNumber", "");
    eq = sh.getStrAttribute("diaryEq", "");
    currentDiary = sh.getStrAttribute("CURRENTDIARY", "");
    descSuff = sh.getStrAttribute("observedData", "");
    currentDiaryCSV = sh.getStrAttribute("CURRENTDIARYCSV", "");

%>
<!DOCTYPE html>
<head>
    <title id='Description'>Chart2</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!--<style>#tblContainer a{display:none;}</style>-->


    <link rel="stylesheet" href="scripts/jqx/styles/jqx.base.css" type="text/css" />
    <link href="rstyle.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="scripts/jqx/styles/jqx.darkblue.css" type="text/css" />

    <script type="text/javascript" src="scripts/jquery.min.js"></script>
    <!--    <script type="text/javascript" src="scripts/jqx/jqxcore.js"></script>
        <script type="text/javascript" src="scripts/jqx/jqxdata.js"></script>
        <script type="text/javascript" src="scripts/jqx/jqxdraw.js"></script>
        <script type="text/javascript" src="scripts/jqx/jqxchart.core.js"></script>
        <script type="text/javascript" src="scripts/jqx/jqxchart.rangeselector.js"></script>-->
    <script type="text/javascript" src="scripts/jqx/jqx-all.js"></script>
    <script type="text/javascript">
        var predGuess = 0.0;
        var totalPossible = 0.0;
        function loadDataFromTable(id) {
            predGuess = 0.000;
            var currentData = $("#pieContainer").jqxChart('getInstance').source.records;
            var rows = $("#" + id + " tbody tr");
            var columns = $("#" + id + " thead th");
            var data = [];
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                var datarow = {};
                for (var j = 0; j < columns.length; j++) {
                    // get column's title.
                    var columnName = $.trim($(columns[j]).text());
                    // select cell.
                    var cell = $(row).find('td:eq(' + j + ')');
                    datarow[columnName] = $.trim(cell.text());
                }
                for (var c = 0; c < currentData.length; c++) {
                    var cur = currentData[c];
                    if (cur.Metric === datarow.Name) {
                        var tmpV = parseFloat(cur.Score) / 10 * (parseFloat(datarow.Weight) + 0.0001);
                        console.log(tmpV);
                        console.log('cur');
                        console.log(parseFloat(cur.Score) / 10);
                        predGuess = predGuess + tmpV;
                        console.log(predGuess);
                        datarow.GuessedScoreContrib = tmpV;
                        break;
                    }
                }
                data[data.length] = datarow;
            }
            return data;
        }
        $(document).ready(function () {
            function getTextFrom(t) {
                var i = 0;
                var length = tonePhraseEx.length;
                for (i = 0; i < length; i++) {
                    if (tonePhraseEx[i].tone === t) {
                        return tonePhraseEx[i].text;
                    }
                }
                return "";
            }
            var tonePhraseEx = [

                {tone: 'agreeablenessBig5', text: 'That guy knew how to party.'},
                {tone: 'sadness', text: 'The Curse of Keen Eyes - 08.19.04 Why I am cursed with being the guy that always sees the saddest and most pathetic little snippets of other peoples & quot; lives?'},
                {tone: 'tentative', text: 'Songs like, um, &quot;Yankee Doodle&quot; or maybe &quot;Skip to my Lu.&quot; I&quot;m not sure if those were around then, though.'},

                {tone: 'anger', text: 'What an idiot I am!'},
                {tone: 'disgust', text: 'THE passenger train is just starting from Bologoe, the junction on the Petersburg-Moscow line.'},
                {tone: 'confident', text: 'I got it, of course.'},
                {tone: 'fear', text: 'Damn all this philosophy and psychology!&quot;The guard walks through the compartment.&quot;My'},
                {tone: 'joy', text: 'revoltingly happy,&quot; he says.'},
                {tone: 'analytical', text: 'But think of her! . . .'},
                {tone: 'agreeablenessBig5', text: 'Tell that lady, then, that her husband is all right!&quot;Ivan'},
                {tone: 'conscientiousnessBig5', text: 'When that time comes you should love like a house on fire, but you won&quot;t heed the dictates of nature, you keep waiting for something.'},
                {tone: 'extraversionBig5', text: 'dear fellow,&quot; the bridegroom addresses him, &quot;when you pass through the carriage No. 209 look out for a lady in a grey hat with a white bird and tell her I&quot;m here!&quot;&quot;Yes,'},
                {tone: 'opennessBig5', text: 'And then something happens in your head and your heart, finer than you can read of in a fairy tale.'},
                {tone: 'joy', text: 'revoltingly happy,&quot; he says.'},
                {tone: 'opennessBig5', text: 'And then something happens in your head and your heart, finer than you can read of in a fairy tale.'}];
            var initTab1 = function () {
                var toolTipCustomFormatFn = function (value, itemIndex, serie, group, categoryValue, categoryAxis) {
                    console.log(serie);
                    console.log(group);
                    console.log(categoryValue);
                    if (serie.dataField !== 'mood')
                    return 'Example: ' + getTextFrom(serie.dataField) + ",<br>  " + serie.displayText + ": " + value;
                else{
                    return "Mood:" + value;
                }
                };
                // prepare jqxChart settings
                var source = <%=data%>;
                var sl=source.length;
                for (var s=0;s<sl;s++){
                    source[s].mood =  source[s].mood * 10;
                }
                var settings = {
                    title: "<%=user.getFirstName()%> Journal Log",
                    description: "Using Tone Analysis",
                    enableAnimations: true,
                    showLegend: true,
                    animationDuration: 1500,
                    enableCrosshairs: true,
                    padding: {left: 5, top: 5, right: 20, bottom: 5},
                    colorScheme: 'scheme02',
                    source: source,
                    xAxis:
                            {
//                            minValue: 175,
//                            maxValue: 550,
                                dataField: 'row',
                                flip: false,
                                valuesOnTicks: true,
                                rangeSelector: {
                                    serieType: 'area',
                                    padding: {/*left: 0, right: 0,*/ top: 20, bottom: 0},
                                    // Uncomment the line below to render the selector in a separate container
                                    //renderTo: $('#selectorContainer'),
                                    backgroundColor: 'white',
                                    size: 110,
                                    gridLines: {visible: false}
                                }
                            },
                    seriesGroups:
                            [
                                {
                                    type: 'line',
                                    toolTipFormatFunction: toolTipCustomFormatFn,
                                    valueAxis:
                                            {
                                                flip: false,
                                                title: {text: 'Value<br><br>'}
                                            },
                                    series: [
                                        {dataField: 'agreeablenessBig5', displayText: 'agreeableness', lineWidth: 1},
                                        {dataField: 'analytical', displayText: 'analytical', lineWidth: 1},
                                        {dataField: 'anger', displayText: 'anger', lineWidth: 1},
                                        {dataField: 'confident', displayText: 'confident', lineWidth: 1},
                                        {dataField: 'conscientiousnessBig5', displayText: 'conscientiousness', lineWidth: 1},
                                        {dataField: 'disgust', lineWidth: 1},
                                        {dataField: 'emotionalRangeBig5', displayText: 'emo range', lineWidth: 1},
                                        {dataField: 'extraversionBig5', displayText: 'extravert', lineWidth: 1},
                                        {dataField: 'fear', displayText: 'fear', lineWidth: 1},
                                        {dataField: 'joy', displayText: 'joy', lineWidth: 1},
                                        {dataField: 'opennessBig5', displayText: 'open', lineWidth: 1},
                                        {dataField: 'sadness', displayText: 'sad', lineWidth: 1},
                                        {dataField: 'tentative', displayText: 'tentative', lineWidth: 1},
//                                    {dataField: 'rowTotal', lineWidth: 1},
                                        {dataField: 'mood', lineWidth: 4,displayText:'Mood'}
//                                    {dataField: 'producivtiy', lineWidth: 1}
                                    ]

                                    ,
                                    annotations: [
                                        {
                                            type: 'rect',
                                            yValue: 90,
                                            xValue: 6,
                                            offset: {x: -45, y: -25},
                                            width: 220,
                                            height: 20,
                                            fillColor: '#EFEFEF',
                                            lineColor: 'red',
                                            text: {
                                                value: '<%=eq%>',
                                                offset: {
                                                    x: 2,
                                                    y: 2
                                                },
                                                'class': 'redLabel',
                                                angle: 0
                                            }
                                        }
                                    ]

                                }
                            ]
                };
                $('#chartContainer').jqxChart(settings);
            };


            var areaData = <%=area%>;
            var initTab2 = function () {
                var settingsArea = {
                    title: "Tone Sampling (multi-linear regression)",
                    description: " x̄ over time",
                    enableAnimations: true,
                    showLegend: true,
                    padding: {left: 10, top: 5, right: 10, bottom: 5},
                    titlePadding: {left: 90, top: 0, right: 0, bottom: 10},
                    source: areaData,
                    xAxis:
                            {
                                valuesOnTicks: true,
                                dataField: 'row',
                                labels: {
//                        formatFunction: function (value) {
//                            return value.getDate();
//                        }
                                },
                                gridLines: {visible: false}
//                   , toolTipFormatFunction: function (value) {
//                        return value.getDate() + '-' + months[value.getMonth()] + '-' + value.getFullYear();
//                    }
                            },
                    valueAxis:
                            {
                                title: {text: 'Weighted Tone Scores '},
                                labels: {horizontalAlignment: 'right'}
                            },
                    colorScheme: 'scheme06',
                    seriesGroups:
                            [
                                {
                                    type: 'stackedarea100',
                                    formatSettings: {sufix: '%', decimalPlaces: 0},
                                    series: [
                                        {dataField: 'agreeablenessBig5', displayText: 'agreeableness', lineWidth: 1},
                                        {dataField: 'analytical', displayText: 'analytical', lineWidth: 1},
                                        {dataField: 'anger', displayText: 'anger', lineWidth: 1},
                                        {dataField: 'confident', displayText: 'confident', lineWidth: 1},
                                        {dataField: 'conscientiousnessBig5', displayText: 'conscientiousness', lineWidth: 1},
                                        {dataField: 'disgust', lineWidth: 1},
                                        {dataField: 'emotionalRangeBig5', displayText: 'emo range', lineWidth: 1},
                                        {dataField: 'extraversionBig5', displayText: 'extravert', lineWidth: 1},
                                        {dataField: 'fear', displayText: 'fear', lineWidth: 1},
                                        {dataField: 'joy', displayText: 'joy', lineWidth: 1},
                                        {dataField: 'opennessBig5', displayText: 'open', lineWidth: 1},
                                        {dataField: 'sadness', displayText: 'sad', lineWidth: 1, labels:
                                                    {
                                                        visible: true,
                                                        backgroundColor: '#FEFEFE',
                                                        backgroundOpacity: 0.2,
                                                        borderColor: '#7FC4EF',
                                                        borderOpacity: 0.7,
                                                        padding: {left: 5, right: 5, top: 0, bottom: 0}
                                                    }},
                                        {dataField: 'tentative', displayText: 'tentative', lineWidth: 1}
                                    ]

                                }



                            ]



                };
                // setup the chart
                $('#areaContainer').jqxChart(settingsArea);
            };
            var initPie = function () {
                var source =
                        {
                            datatype: "csv",
                            rowDelimiter: '|',
                            datafields: [
                                {name: 'Metric'},
                                {name: 'Score'}
                            ],
                            localdata: "<%=currentDiaryCSV%>"
                        };
                var dataAdapter = new $.jqx.dataAdapter(source, {autoBind: true});
                var settings = {
                    title: "Latest Diary Adjusted Scores",
                    description: "Guessed Mood:  vs Actual Mood: ",
                    enableAnimations: true,
                    showLegend: true,
//                showBorderLine: true,
                    legendLayout: {left: 700, top: 120, width: 300, height: 400, flow: 'vertical'},
                    padding: {left: 5, top: 5, right: 5, bottom: 5},
                    titlePadding: {left: 0, top: 0, right: 0, bottom: 10},
                    source: dataAdapter,
                    colorScheme: 'scheme03',
                    seriesGroups:
                            [
                                {
                                    type: 'pie',
                                    showLabels: true,
                                    series:
                                            [
                                                {
                                                    dataField: 'Score',
                                                    displayText: 'Metric',
                                                    labelRadius: 170,
                                                    initialAngle: 15,
                                                    radius: 145,
                                                    centerOffset: 0,
                                                    formatFunction: function (value) {
                                                        if (isNaN(value))
                                                            return value;
                                                        return parseInt(value) + '%';
//        return parseFloat(Math.round(value * 100) / 100).toFixed(1) + '%';
                                                    }
                                                }
                                            ]
                                }
                            ]
                };
                // setup the chart
                $('#pieContainer').jqxChart(settings);
            };

            var initWidgets = function (tab) {
                console.log("tab");
                console.log(tab);
                switch (tab) {
                    case 0:
                        initTab1();
                        break;
                    case 1:
                        initTab2();
                        break;
                    case 2:
                        initPie();
                        var theData = loadDataFromTable("tblWeightedData");
                        console.log(theData);
                        var desc = "Mood - Prediction: " + Math.round(predGuess * 10) + "<%=descSuff%>";
                        $('#pieContainer').jqxChart({description: desc});

                        // refresh the chart element
                        $('#pieContainer').jqxChart('refresh');
                        break;
                }
            };
            var x = "";
            var index = $.jqx.cookie.cookie("jqxTabs_jqxWidget");
            if (typeof index === 'undefined')
                index = 0;
            // on to the select event.
            $('#jqxTabs').jqxTabs({width: '90%', height: 660

                , initTabContent: initWidgets
//                , selectedItem: index
                , selectionTracker: true
                , theme: 'darkblue'
            });
            $("#jqxTabs").on('selected', function (event) {
                // save the index in cookie.

                $.jqx.cookie.cookie("jqxTabs_jqxWidget", event.args.item);
                initWidgets(event.args.item);
            });
        });
    </script>
</head>
<body class='default'>   <a href="home.jsp"><div id="header" style="width:95%;margin:2px 0">
            <table id="headerTbl" style='width:95%'><tr><td style="width:85%">
                        <h1> Tone Report </h1>
                        <p> Welcome to MedLog. </p>
                    </td><td style="background-image: url(Logo.png); background-repeat: no-repeat;text-align: left;background-position-x: left;">

                    </td></tr></table>
        </div></a>

    <div id='jqxTabs'>
        <ul>
            <li style="margin-left: 30px;">
                <div style="height: 20px; margin-top: 5px;">
                    <div style="margin-left: 4px; vertical-align: middle; text-align: center; float: left;">
                        Line Series
                    </div>
                </div>
            </li>
            <li>
                <div style="height: 20px; margin-top: 5px;">
                    <div style="margin-left: 4px; vertical-align: middle; text-align: center; float: left;">
                        Weighted Area
                    </div>
                </div>
            </li>
            <li>
                <div style="height: 20px; margin-top: 5px;">
                    <div style="margin-left: 4px; vertical-align: middle; text-align: center; float: left;">
                        Under the hood
                    </div>
                </div>
            </li>
        </ul>
        <div style="overflow: hidden;">
            <div id='chartContainer' style="width:90%; height:600px;">
            </div>
            <!-- you can optionally render the selecor in this container -->
            <div id='selectorContainer' style="width:500px; height:100px;">
            </div>
            <!--  <div id='financialChart' style="width: 100%; height: 100%">
              </div>-->
        </div>
        <div style="overflow: hidden;">
            <div id='areaContainer' style="width:100%; height:600px;">
            </div>
        </div>
        <div style="overflow: hidden;">
            <div id='tblContainer' style="width:100%; height:600px;">
                <div id='pieContainer' style="width: 850px; height: 500px;float: left;">
                </div>
                <div style="float: left;"><table><tr><td></td><td><h4>PMF Scores Cross Journal Entry</h4><%=tbl%></td><td><%=currentDiary%></td></tr></table> </div>
                <div style="border:2px solid lawngreen; border-radius:4px; background-color: limegreen;color:white;"></div>
                <b>Five # Summary >>></b>
                <%=fiveNum%>
            </div>
        </div>
    </div>
</body>