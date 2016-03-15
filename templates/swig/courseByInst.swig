<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>

    {% if test %}
        <link rel="stylesheet" href="/bower_components/font-awesome/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/bower_components/bootstrap/dist/css/bootstrap.css" />
        <link rel="stylesheet" href="/assets/main.css" />
    {% else %}
        <link rel="stylesheet" href="file://{{ dirname }}/bower_components/font-awesome/css/font-awesome.min.css" />
        <link rel="stylesheet" href="file://{{ dirname }}/bower_components/bootstrap/dist/css/bootstrap.css" />
        <link rel="stylesheet" href="file://{{ dirname }}/assets/main.css" />
    {% endif %}

</head>
<body>

    <div class="page front">

        <div class="header">
            <h1>{{ evalType.period }} {{ evalType.who }} Evaluation Report: Means By {{ evalType.by }}</h1>

            <h2>University of California, Irvine<br />
                School of Education</h2>
        </div>

        <div id="summary" class="row">

            {% if surveys.length %}
            <table>
                <thead>
                    <tr>
                        <td>&nbsp;</td>

                        <!--<td class="bg-dark-gray">#</td>-->

                        {% for q in surveys['0'].mainQuestions %}
                        <td>Q{{loop.index|lPadDigits(2)}}</td>
                        {% endfor %}

                        <td class="means bg-dark-gray">Mean</td>

                        {% for q in surveys['0'].addQuestions %}
                        <td>Q{{(mainQuestions.length + loop.index)|lPadDigits(2)}}</td>
                        {% endfor %}

                        <td>Enr</td>
                        <td>Resp</td>
                        <td>Rate</td>
                    </tr>
                </thead>
                <tbody>
                    {% for s in surveys %}
                    <tr class="{{ (s.rowClass || '') }}">
                        <td class="left-header">
                            <table>
                                <tr>
                                    {% for l in s.label %}
                                    <td class="{{ (loop.last && !loop.first) && 'right-align' }}">
                                        {{ l }}
                                    </td>
                                    {% endfor %}
                                </tr>
                            </table>
                        </td>

                        <!--<td class="bg-dark-gray">{{ s.surveyed }}</td>-->

                        {% for q in s.mainQuestions %}
                        <td>{{ q.shortAvg }}</td>
                        {% endfor %}

                        <td class="means bg-dark-gray">{{ s.mainTotals.shortAvg }}</td>

                        {% for q in s.addQuestions %}
                        <td>{{ q.shortAvg }}</td>
                        {% endfor %}

                        {% if s.enrolled %}
                        <td>{{ s.enrolled }}</td>
                        <td>{{ s.surveyed }}</td>
                        <td>{{ s.perc_surveyed_short }}%</td>
                        {% else %}
                        <td class="empty">&nbsp;</td>
                        <td class="empty">&nbsp;</td>
                        <td class="empty">&nbsp;</td>
                        {% endif %}
                    </tr>
                    {% endfor %}
                </tbody>
            </table>
            {% endif %}
        </div>

        <div id="questions" class="row">
            <div class="col-xs-2 programs">
                {% if placement %}
                <p>Programs</p>
                <ul>
                    {% for place in placement %}
                    <li>{{ place }}</li>
                    {% endfor %}
                </ul>
                {% else %}
                &nbsp;
                {% endif %}
            </div>
            <div class="col-xs-10">
                <div class="row header">
                    <h3>Candidate Supervisor Evaluation Items</h3>
                    <ol>
                        {% for a in answers %}
                            <li>{{a.text}} ({{a.value}})</li>
                        {% endfor %}
                    </ol>
                </div>

                {% for q in mainQuestions %}
                <div class="row">
                    <div class="col-xs-1 score">{{ lowerMeans.mainQuestions[loop.index0].shortAvg }}</div>
                    <div class="col-xs-1 question-number">Q{{loop.index|lPadDigits(2)}}</div>
                    <div class="col-xs-10 question">{{ q.question }}</div>
                </div>
                {% endfor %}

                <div class="row mean bg-gray">
                    <div class="col-xs-1 score">{{ lowerMeans.mainTotals.shortAvg }}</div>
                    <div class="col-xs-1 question-number">Mean</div>
                    <div class="col-xs-10 question">Mean of Questions 1 - {{ mainQuestions.length }}</div>
                </div>

                {% for q in addQuestions %}
                <div class="row">
                    <div class="col-xs-1 score">{{ lowerMeans.addQuestions[loop.index0].shortAvg }}</div>
                    <div class="col-xs-1 question-number">Q{{(mainQuestions.length + loop.index)|lPadDigits(2)}}</div>
                    <div class="col-xs-10 question">{{ q.question }}</div>
                </div>
                {% endfor %}

            </div>

        </div>

        <!--<div id="footer" class="row">-->
            <!--* All means are based on the courses completed during the quarter and are weighted by the number of-->
            <!--responses to each question.-->
            <!--<ul>-->
            <!--<li>All Means are based on the evaluations completed during the quarter and are weighted by the number-->
            <!--of-->
            <!--responses to each question.-->
            <!--</li>-->
            <!--<li>Mean == Mean of item means within row weighted by the number of responses to each question.</li>-->
            <!--<li># == Count of evaluations.</li>-->
            <!--<li>Qtr Mean == Mean of all evaluations of the supervisors by candidates during the quarter.</li>-->
            <!--<li>Supervisor Mean == Mean of all evaluations of each supervisor by candidates during the quarter.</li>-->
            <!--<li>Program Mean == Mean of all evaluations of each supervisor within each program be candidates during-->
            <!--the-->
            <!--quarter.-->
            <!--</li>-->
            <!--</ul>-->

        <!--</div>-->

    </div>

    <div class="page back">

        <div class="header">
            <h1>{{ evalType.period }} {{ evalType.who }} Evaluation Report: Means By {{ evalType.by }}</h1>

            <h2>University of California, Irvine<br />
                School of Education</h2>
        </div>

        {% for s in surveys %}
            {% if s.written|hasProps %}
                <div class="course-header row">
                    <div class="row">
                        <div class="col-xs-2"><h3>{{ term }}</h3></div>
                        <div class="col-xs-4"><h3>{{ name }}</h3></div>
                        <div class="col-xs-6"><h3>{{ s.label|join(' ') }}</h3></div>
                    </div>
                </div>
                {% for q in writtenQuestions %}
                    <div class="row question">
                        <div class="col-xs-4">Q{{ (mainQuestions.length + addQuestions.length + loop.index)|lPadDigits(2)}}. {{ q.question }}</div>
                        <div class="col-xs-8">
                            {% for a in s.written[q.question_num] %}
                                <div class="back-answers row">
                                    <div class="col-xs-12"><p>{{ a }}</p></div>
                                </div>
                            {% endfor %}
                        </div>
                    </div>
                {% endfor %}
            {% endif %}
        {% endfor %}

    </div>

</body>
</html>
