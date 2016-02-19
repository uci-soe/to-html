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

    <div class="page front all-school">

        <div class="header">
            <h1>Course Evaluation Means: {{ term }} {{ optText }}</h1>

            <h2>University of California, Irvine<br />
                School of Education</h2>
        </div>

        <table>
            <thead>
                <tr class="">
                    <td class="question-number">&nbsp</td>
                    <td class="question">Instructor Evaluation Questions</td>
                    <td class="means">
                        <div><span>Undergrad</span></div>
                    </td>
                    <td class="means">
                        <div><span>MAT/Credential</span></div>
                    </td>
                    <td class="means">
                        <div><span>Ph.D.</span></div>
                    </td>
                    <td class="means">
                        <div><span>All Courses</span></div>
                    </td>
                </tr>
            </thead>
            <tbody>
                {% for q in questions %}
                {% if q.section == 'main' %}
                <tr>
                    <td class="question-number">Q{{q.question_num|lPadDigits(2)}}</td>
                    <td class="question">{{ q.question }}</td>
                    <td class="means">{{ averages['undergrad'][q.question_num].avg|round }}</td>
                    <td class="means">{{ averages['mat/credential'][q.question_num].avg|round }}</td>
                    <td class="means">{{ averages['phd'][q.question_num].avg|round }}</td>
                    <td class="means">{{ averages['all'][q.question_num].avg|round }}</td>
                </tr>
                {% endif %}
                {% endfor %}
                <tr class="bold totals">
                    <td colspan="2" class="right">Means of All Instructor Evaluation Question</td>
                    <td>{{ totalAverages['undergrad'].avg|round }}</td>
                    <td>{{ totalAverages['mat/credential'].avg|round }}</td>
                    <td>{{ totalAverages['phd'].avg|round }}</td>
                    <td>{{ totalAverages['all'].avg|round }}</td>
                </tr>
            </tbody>
            <thead>
                <tr class="">
                    <td class="question-number">&nbsp</td>
                    <td class="question">Additional Evaluation Questions</td>
                    <td class="means">
                        <div><span>Undergrad</span></div>
                    </td>
                    <td class="means">
                        <div><span>MAT/Crede.</span></div>
                    </td>
                    <td class="means">
                        <div><span>Ph.D.</span></div>
                    </td>
                    <td class="means">
                        <div><span>All Courses</span></div>
                    </td>
                </tr>
            </thead>
            <tbody>
                {% for q in questions %}
                {% if q.section == 'add' %}
                <tr>
                    <td class="question-number">Q{{q.question_num|lPadDigits(2)}}</td>
                    <td class="question">{{ q.question }}</td>
                    <td class="means">{{ averages['undergrad'][q.question_num].avg|round }}</td>
                    <td class="means">{{ averages['mat/credential'][q.question_num].avg|round }}</td>
                    <td class="means">{{ averages['phd'][q.question_num].avg|round }}</td>
                    <td class="means">{{ averages['all'][q.question_num].avg|round }}</td>
                </tr>
                {% endif %}
                {% endfor %}
            </tbody>
        </table>

        <div class="footer">
            <div class="notes">
                <p>* "All Programs" and "All Question Means" means are calculated using raw data, not grand mean</p>
                <div class="pos-right">{{dateString}}</div>
            </div>
        </div>

    </div>

</body>
</html>