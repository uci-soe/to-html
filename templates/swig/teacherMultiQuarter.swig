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

        <div class="row overview">
            <div class="row name bg-dark-gray border-top border-bottom">
                <h3>
                    {{ teacher.name }}
                    {% if term %}
                        -- {{ term }}
                    {% endif %}
                </h3>
            </div>
            <table>
                <thead>
                    <tr class="bg-gray">
                        <td colspan="4">Info.</td>
                        <td>Means</td>
                        <td>Enrolled</td>
                        <td>Surveyed</td>
                        <td>Rate %</td>
                    </tr>
                </thead>
                <tbody>
                    {% for cat in categories %}
                        {% if !loop.first %}
                            <tr class="spacer"><td colspan="8">&nbsp;</td></tr>
                        {% endif %}

                        <tr class="bg-lt-gray category">
                            <td colspan="4">{{ cat.category }}</td>
                            <td>{{ cat.avg|round(2) }}</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        {% for cls in classes %}
                            {% if catRelations[ cls.class_number ] == cat.category %}
                                <tr>
                                    <td>{{cls.session}} {{cls.year}}</td>
                                    <td>{{cls.class_number}}</td>
                                    <td>{{cls.short_desc}}</td>
                                    <td>{{cls.type}} {{cls.section}}</td>
                                    <td>{{cls.avg|round(2)}}</td>
                                    <td>{{cls.enrolled}}</td>
                                    <td>{{cls.surveyed}}</td>
                                    <td>{{(cls.surveyed / cls.enrolled)|percent(2)}}%</td>
                                </tr>
                            {% endif %}
                        {% endfor %}
                    {% endfor %}
                </tbody>
            </table>
        </div>

    </div>

</body>
</html>