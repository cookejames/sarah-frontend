angular.module('rickshawGraph', []).directive('rickshawGraph', function($compile, $window) {
	'use strict';
	return {
		restrict: 'AE',
		scope: {
			sensors : '=rickshawSensors',
			config: '=rickshawConfig'
		},
		link: function(scope, element, attrs) {
			var graph, yAxis, series, settings;
			var defaults = {
				height:				300,
				axisWidth:			45,
				smooth:				4.5,
				pixelsPerTick:		40
			};

			function getSettings() {
				return angular.extend(defaults, scope.config);
			}

			function getData() {
				var palette = new Rickshaw.Color.Palette();
				var series = [];
				angular.forEach(scope.sensors, function(sensor){
					var data = [];
					angular.forEach(sensor.values, function(value){
						data.push({
							x: value.date,
							y: value.value
						});
					});

					//calculate the range
					var range;
					if (sensor.graphStart === null) {
						range = d3.extent(data, function(d){return d.y;});
					} else {
						range = [sensor.graphStart, d3.max(data, function(d){return d.y;})];
					}

					series.push({
						name: sensor.description,
						data: data,
						scale: d3.scale.linear().domain(range),
						color: palette.color(),
						id: sensor.id,
						node: sensor.node,
						units: sensor.units,
						valueType: sensor.valueType
					});
				});

				return series;
			}

			/**
			 * Resize the graph to the size of its parent element
			 */
			function resizeGraph() {
				var width = getGraphWidth();

				if (graph && width > 0) {
					graph.configure({
						width: width
					});
					graph.render();
				}
			}

			/**
			 * Get the expected width of the graph with the y-axis in place
			 * @returns {number}
			 */
			function getGraphWidth() {
				var width = element.width() - settings.axisWidth;
				return (width < 0) ? 0 : width;
			}

			/**
			 * Make the graph responsive on window sizing
			 */
			function makeResponsive() {
				angular.element($window).bind('resize', function(){
					resizeGraph();
				});
			}

			/**
			 * Create the graph y axis
			 * @param element
			 * @returns {Rickshaw.Graph.Axis.Y.Scaled}
			 */
			function createYAxis(element) {
				var axis = new Rickshaw.Graph.Axis.Y.Scaled( {
					graph:			graph,
					orientation:	'right', //ticks to the right
					element:		element,
					height:			settings.height,
					scale:			graph.series[0].scale, //set an initial scale
					width:			settings.axisWidth,
					pixelsPerTick:	settings.pixelsPerTick, //how often to display ticks
					grid:			false
				} );
				return axis;
			}

			/**
			 * Create the graph hover details with date formatting
			 */
			function createHoverDetail() {
				var hoverDetail = new Rickshaw.Graph.HoverDetail({
					graph: graph,
					xFormatter: function(x) {
						return new Date(x * 1000).toString();
					},
					formatter: function(series, x, y, formattedX, formattedY, d) {
						var value = (series.valueType == 'float') ? formattedY : parseInt(y);
						value += (series.units) ? series.units : '';
						setAxisStyleBySeries(yAxis, series);
						return series.name + ':&nbsp;' + value;
					}
				});

				return hoverDetail;
			}

			/**
			 * Set the style of the axis to match this series
			 */
			function setAxisStyleBySeries(axis, series) {
				axis.scale = series.scale;
				axis.render();
				angular.element(axis.element)
					.css('fill', series.color)
					.find('path')
					.css('stroke', series.color);
			}

			/**
			 * Create the graph legend with series toggle
			 */
			function createLegend(element) {
				var legend = new Rickshaw.Graph.Legend( {
					graph: graph,
					element: element
				} );

				new Rickshaw.Graph.Behavior.Series.Toggle( {
					graph: graph,
					legend: legend
				} );

				return legend;
			}

			/**
			 * Create graph axis
			 */
			function createXAxis() {
				var xAxis = new Rickshaw.Graph.Axis.Time( {
					graph: graph
				} );
				xAxis.render();
				return xAxis;
			}

			function update() {
				series = getData();
				settings = getSettings();

				if (series.length === 0) return;

				var wrap = angular.element(element);
				wrap.empty();

				//create all the elements we need
				var yAxisElement = $compile('<div class="yAxis"></div>')(scope);
				var graphElement = $compile('<div class="chart"></div>')(scope);
				var legendElement = $compile('<div class="legend"></div>')(scope);
				wrap
					.append(yAxisElement)
					.append(graphElement)
					.append(legendElement);

				//create the graph
				graph = new Rickshaw.Graph({
					element: graphElement[0],
					series: series,
					renderer: 'line',
					height: settings.height,
					width: getGraphWidth()
				});

				//create the graph smoother
				var smoother = new Rickshaw.Graph.Smoother( {
					graph: graph
				});
				smoother.setScale(settings.smooth);
				graph.render();

				yAxis = createYAxis(yAxisElement[0]);
				createXAxis();
				createHoverDetail();
				createLegend(legendElement[0]);
				makeResponsive();
			}

			scope.$watch('sensors', function(newValue, oldValue) {
				if (!angular.equals(newValue, oldValue)) {
					update();
				}
			}, true);

			update();
		}
	};
});