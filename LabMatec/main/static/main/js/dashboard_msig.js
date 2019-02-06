/***************************************
JavaScript para Dashboard
Version: 1.0 - 2014
author: @jbravot (jonathan Bravo)
email: info@jonathanbravo.com
web: jonathanbravo.com
****************************************/

;(function( Graficos, $, undefined ){

    Graficos.monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    Graficos.monthNamesShort = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    Graficos.dayNames = ['Domingo','Lunes','Martes','Mi\u00E9rcoles','Jueves','Viernes','S\u00e1bado'];
    Graficos.dayNamesWeek = ['Lunes','Martes','Mi\u00E9rcoles','Jueves','Viernes'];
    Graficos.dayNamesShort = ['Dom','Lun','Mar','Mi\u00E9','Jue','Vie','S\u00e1b'];


    Graficos.crearBarra = function(titulo, id_container, series){
        Highcharts.chart(id_container, {
            chart: {
                type: 'column',
            },
            title: {
                text: titulo
            },
            subtitle: null,
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            plotOptions: {
                column: {
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#FFFFFF',
                        align: 'center',
                    },
                }
            },
            yAxis: {
                min: 0,
                title: null
            },
            legend: {
                enabled: false
            },
            credits: false,
            series: series
        });
    };

    Graficos.crearPie = function(titulo, id_container, series){
        Highcharts.chart(id_container, {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
            },
            title: {
                text: titulo
            },
            subtitle: null,
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {enabled: false},
                    showInLegend: true
                }
            },
            credits: false,
            series: series
        });
    };

    Graficos.crearTimeLine = function (titulo, id_container, jsonData) {
        Highcharts.setOptions({
            lang: {
                months: Graficos.monthNames,
                weekdays: Graficos.dayNames,
                shortMonths: Graficos.monthNamesShort,
                resetZoom: "Reiniciar Zoom"
            }
        });
        var chart = new Highcharts.Chart({
                chart: {
                    renderTo: id_container,
                    zoomType: 'x',
                    spacingRight: 20
                },
                title: {
                    text: titulo
                },
                subtitle: {
                    text: document.ontouchstart === undefined ?
                        'Haz click y arrastra sobre la gráfica para hacer zoom' :
                        'Click en la gráfica para hacer zoom'
                },
                xAxis: {
                    type: 'datetime',
                    maxZoom: 14 * 24 * 3600000, // fourteen days
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    allowDecimals: false,
                    min: 0,
                    gridLineWidth: 1,
                    title: {
                        text: 'Suma de Valores [$]'
                    }
                },
                tooltip: {
                    formatter: function() {
                        return Highcharts.dateFormat("%e. %b",this.x)+"<br/><b>$ "+this.y+"</b>";
                    }
                },
                plotOptions: {
                    area: {
                        stacking: 'normal',
                    }
                },
                legend: {
                    borderWidth: 0,
                    backgroundColor: "#FFFFFF",
                    shadow: false
                },
                credits: false,
                series: jsonData,
        });
    };

}( window.Graficos = window.Graficos || {}, jQuery ));

;(function( Estadisticas, $, undefined ){

    Estadisticas.crearGraficoBarra = function (url,id){
        $.getJSON(url, function(data) {
            Graficos.crearBarra(id, '', [data]);
        })
        .error(function() { alert("Error al Cargar los Datos"); });
    };

}( window.Estadisticas = window.Estadisticas || {}, jQuery ));




