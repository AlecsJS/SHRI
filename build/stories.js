
'use strict';

const e = React.createElement; // Для сокращения кода создаем константу 'e', которая возвращает метод React.createElement.

class RootRender extends React.Component { // Класс, возвращающий React объект готового шаблона.
	
	constructor (props) {
		super(props);
	}

	render () {
		const templates = {
		    leaders: Leaders,
		    vote: Vote,
		    chart: Chart,
		    diagram: Diagram,
		    activity: Activity
		}
		return e(
				'div',
				{ className: 'body_wrapper', id: `body_wrapper_${this.props.alias}` },
				e(
					Header,
					{ title: this.props.data.title, subtitle: this.props.data.subtitle, alias: this.props.alias }
					),
				e(
					templates[this.props.alias],
					{ data: this.props.data, theme: document.querySelector('body').getAttribute('class').slice(6) }
					)
			)
	}

}

class Header extends React.Component { // Класс, возвращающий React объект заголовка шаблона.

	constructor (props) {
		super(props);
	}

	render () {
		return e(
				'div',
				{ className: 'header_wrapper' },
				e(
					'h1',
					{ id: 'title', className: `title_${this.props.alias}` },
					this.props.title
					),
				e(
					'h4',
					{ id: 'subtitle', className: `subtitle_${this.props.alias}` },
					this.props.subtitle
					)
			)
	}

}

class Leaders extends React.Component { // Класс, возвращающий объект основного контента шаблона Leaders.

	constructor (props) {
		super(props);
	}

	template (props) {
		let user, upvoted = -1;
		if (props.data.selectedUserId) { 
			user = props.data.users;
			user.forEach((value, index) => (value.id == props.data.selectedUserId) ? upvoted = index : null);
		} else {
			user = props.data.users;
		}
		const leaders = user.map(
			(number, key) => {
				let id = key; (key == 4) && (key < upvoted) ? id = upvoted : null;
				let icon; (!key) ? icon = props.data.emoji : (id == upvoted) ? icon = 'thumb-up' : null;
				return (key < 5) && e(
					'div',
					{ key: 'column' + key, className: 'column', id: `column-${ key + 1 }` },
					e(
						UserCard, 
						{ key: 'UserCard' + key, type: 'userCard', name: user[id].name, avatar: user[id].avatar, icon: icon, info: user[id].valueText }
					),
					e(
						'div',
						{ key: 'bar' + key, className: 'bar', id: `bar${ key + 1 }` },
						e(
							'span',
							{ key: 'barSpan' + key, className: 'bar_place' },
							`${ id + 1 }`
							),
							(key == 0) && (upvoted > 2) && 
								e(	
									'div',
									{ className: 'userCard_upvoted_wrapper' },
									e(
										UserCard, 
										{ key: 'UserCard-extra' + key, type: 'userCard', name: user[upvoted].name, avatar: user[upvoted].avatar, icon: 'thumb-up', info: user[upvoted].valueText }
										),
									e(
										'span',
										{ key: 'barSpan' + key, className: 'bar_place' },
										`${ upvoted + 1 }`
										)
									)
						)
					)
				}
			);
		return e(
				'div', 
				{ className: 'columns', id: 'columns_leaders' }, 
				leaders
			)
	}

	render () {
		return e(
				'div',
				{ className: 'content_wrapper' },
				e(
					this.template, 
					{ data: this.props.data }
					)
				)
	}

}

class Vote extends React.Component { //Класс, возвращающий объект основного контента шаблона Vote.

	constructor (props) {
		super(props);
	}

	template (props) {
		let user = props.data.users;
		let upvoted = -1;
		let offset = 0;
		if (props.data.selectedUserId)
			user.forEach((value, index) => (value.id == props.data.selectedUserId) ? upvoted = index : null);
		if (props.data.offset)
			user.forEach((value, index) => (value.id == props.data.offset) ? offset = index : null);
		const vote = user.map(
			(number, key) => {
				let id = key + offset;
				let column = id + 1;
				let icon;
				return (key < 3) && e(
					'div',
					{ key: 'column_adaptive' + key, className: 'column_adaptive', id: `column_adaptive_${ column }` },
					(key < 3) && e(
						'div',
						{ key: 'column_1' + key, className: `column ${ column > 5 + offset ? 'adaptive' : '' } ${ (column == offset + 4) ? 'moved' : '' }`, id: `column_vote_${ column }` },
						(key == 1) && e(
							NavigationButtons,
							{ offset: offset, theme: props.theme, type: 'upper' }
							),
						 (user[id]) && e(
							UserCard, 
							{ key: 'UserCard_1' + key, type: 'userCard', wrapped: true, active: id == upvoted, name: user[id].name, avatar: user[id].avatar, icon: (id == upvoted) ? icon = 'thumb-up' : null}
							),
							(key != 0) && (user[id + 3]) && e(
								UserCard, 
								{ key: 'UserCard_2' + key, type: 'userCard', wrapped: true, name: user[id + 3].name, avatar: user[id + 3].avatar, icon: (id + 3 == upvoted) ? icon = 'thumb-up' : null}
								),
						(key == 1) && e(
							NavigationButtons,
							{ offset: offset, theme: props.theme, type: 'lower', active: true }
							)				
						),
					(key == 1) && e(
						'div',
						{ key: 'column_nav_btn' + key, className: 'column', id: `vote_navigation_desktop` },
						e(
							NavigationButtons,
							{ offset: offset, theme: props.theme, type: 'desktop' }
							)
						),
					(key != 1) && e(
						'div',
						{ key: 'column_2' + key, className: `column ${ (column + 3) > 5 + offset ? 'adaptive' : '' } ${ (column + 3 == offset + 4) ? 'moved' : '' }`, id: `column_vote_${ column + 3 }` },
						(key != 2) && (user[id + 3]) && e(
							UserCard, 
							{ key: 'UserCard_3' + key, type: 'userCard', wrapped: true, active: id + 3 == upvoted, name: user[id + 3].name, avatar: user[id + 3].avatar, icon: (id + 3 == upvoted) ? icon = 'thumb-up' : null}
							),
						(key == 2) && (user[id + 5]) && e(
							UserCard, 
							{ key: 'UserCard_4' + key, type: 'userCard', wrapped: true, active: id + 5 == upvoted, name: user[id + 5].name, avatar: user[id + 5].avatar, icon: (id + 5 == upvoted) ? icon = 'thumb-up' : null}
							)			
						),
					(key == 0) && (user[id + 6]) && e(
						'div',
						{ key: 'column_3' + key, className: `column ${ (column + 6) > 5 + offset ? 'adaptive' : '' } ${ (column + 6 == offset + 4) ? 'moved' : '' }`, id: `column_vote_${ column + 6 }` },
						e(
							UserCard, 
							{ key: 'UserCard_5' + key, type: 'userCard', wrapped: true, active: id + 6 == upvoted, name: user[id + 6].name, avatar: user[id + 6].avatar, icon: (id + 6 == upvoted) ? icon = 'thumb-up' : null}
							)						
						)
					); 
				}
			);
		return e(
				'div', 
				{ className: 'columns', id: 'columns_vote' }, 
				vote
			)
	}

	render () {
		return e(
				'div',
				{ className: 'content_wrapper' },
				e(
					this.template, 
					{ data: this.props.data, theme: this.props.theme }
					)
				)
	}  

}

class Chart extends React.Component {

	constructor (props) {
		super(props);
	}

	chartBars (props) {
		var maxBar = 0;
		for (var key in props.data.values) {
			((props.data.values[key].value > maxBar) && (key > 3) && (key < 13)) ? maxBar = props.data.values[key].value : null;
		}
		const chartBars = props.data.values.map((number, key) => {
				return (key > 3) && (key < 13) &&  e(
						'div',
						{ key: 'bar_chart_wrapper' + key, className: 'bar_chart_wrapper' },
						(number.value*70/maxBar != 0) && e(
							'span',
							{ key: 'bar_chart_value' + key, className: 'bar_chart_value', 'active': `${ (number.active == true) ? true : false }`, style: { fontSize: `${maxBar > 10000 ? '4vmin' : '5.4vmin'}` } },
							number.value
							),
						e(
							'div',
							{ key: 'bar_chart' + key, className: 'bar', id: 'bar_chart' , style: {
								height: `${ (number.value*70/maxBar == 0) ? 2.1 : number.value*70/maxBar-6 }${ (number.value*70/maxBar == 0) ? 'vmin' : '%' }`
							}, 'active': `${ (number.active == true) ? true : false }` }
							),
						e(
							'span',
							{ key: 'bar_chart_title' + key, className: 'bar_chart_title' },
							number.title
							)
						)
			}
		)
		return e(
				'div',
				{ className: 'columns', id: 'columns_chart_bars' },
				chartBars
			);
	}

	chartLeaders (props) {
		const chartLeaders = props.data.users.map((number, key) => {
				return (key < 2) && e(
						'div',
						{ key: 'chart_leaders_columns' + key, className: `column` },
						e(
							UserCard,
							{ key: 'chart_UserCard_min' + key, type: 'userCard', min: true, name: number.name, avatar: number.avatar, info: number.valueText }
						)
					)
			}
		);
		return e(
				'div',
				{ className: 'columns', id: 'columns_chart_leaders' },
				chartLeaders,
				e(
					'div',
					{ className: 'divider' }
					)
			);
	}

	render () {
		return e(
				'div',
				{ className: 'content_wrapper', id: 'content_wrapper_chart' },
				e(
					this.chartBars, 
					{ data: this.props.data }
					),
				e(
					this.chartLeaders, 
					{ data: this.props.data }
					)
				)
	}

}

class Diagram extends React.Component {

	constructor (props) {
		super(props);
	}

	diagramTitle (props) {
		return e(
					'div',
					{ className: 'diagram_title' },
					e(
						'h3',
						{ className: 'diagram_title_total_text' },
						props.header
						),
					e(
						'h4',
						{ className: 'diagram_title_difference_text' },
						props.subheader
						)
				)
	}

	categories (props) {
		const categories = props.data.categories.map((number, key) => {
				return e(
						React.Fragment,
						{ key: 'React.Fragment' + key },
						e(
							'div',
							{ key: 'category' + key, className: 'diagram_categories_row' },
							e(
								'div',
								{ key: 'row_items_left' + key, className: 'row_items_left' },
								e(
									Canvas,
									{ key: 'category_circle' + key, data: props.data, type: 'circle', theme: props.theme, index: key }
									),
								e(
									'span',
									{ key: 'category_title' + key, className: 'category_title' },
									number.title
									),
								),
							e(
								'div',
								{ key: 'row_items_right' + key, className: 'row_items_right' },
								e(
									'span',
									{ key: 'category_difference_text' + key, className: 'category_difference_text' },
									`+${parseInt(number.differenceText)}`
									),
								e(
									'span',
									{ key: 'category_value_text' + key, className: 'category_value_text' },
									parseInt(number.valueText)
									)
								)
							),
						props.data.categories[key + 1] != null && e(
							'div',
							{ key: 'categories_divider' + key, className: 'divider row' }
							)
						)
			}
		)
		return e(
				'div',
				{ className: 'diagram_categories' },
				categories
			)
	}

	render () {
		return e(
				'div',
				{ className: 'content_wrapper' },
				e(
					'div',
					{ className: 'columns', id: 'columns_diagram' },
					e(
						'div',
						{ className: 'diagram' },
						e(
							this.diagramTitle,
							{ header: this.props.data.totalText, subheader: this.props.data.differenceText }
							),
						e(
							Canvas,
							{ data: this.props.data, type: 'diagram', theme: this.props.theme }
							)
						),
					e(
						this.categories,
						{ data: this.props.data, theme: this.props.theme }
						)
					)
			)
	}

}

class Activity extends React.Component {

	constructor (props) {
		super(props);
	}

	mapDesktopData (props) {
		var mapDesktopData = Array();
		props.map((value, key_row) => {
				mapDesktopData[key_row] = Array();
				value.map((value, key_column) => {
						key_column % 2 == 0 && mapDesktopData[key_row].push(props[key_row][key_column] + props[key_row][key_column + 1]);
					}
				)
			}
		)
		return mapDesktopData;
	}

	heatMap (data, theme) {
		const mapDesktop = this.mapDesktopData(data).map((value, key_row) => {
				const bar = value.map((value, key) => {
					return e(
							'img',
							{ key: 'heat_map_bar' + key, src: `/assets/icons/${value > 4 ? 'extra' : value > 2 ? 'max' : value > 0 ? 'mid' : 'min'}-${theme}.svg`, style: { width: '9vmin' } }
							)
					}
				);
				return e(
						'div',
						{ key: 'heat_map_row' + key_row, className: 'heat_map_row', style: { transform: `${ key_row % 2 != 0 ? `translate(4.5vmin, -${ key_row * 7.5 }vmin)` : key_row != 0 ? `translate(0, -${ key_row * 7.5 }vmin)` : null }` } },
						bar
					)
			}
		);
		const mapAdaptive = data.map((value, key_row) => {
				const bar = value.map((value, key) => {
					return e(
							'div',
							{ key: 'heat_map_bar_wrapper' + key, className: 'heat_map_bar_wrapper', style: { transform: `${ key % 2 != 0 ? `translate(5.85vmin, -${ key * 7.5 }vmin)` : key != 0 ? `translate(0, -${ key * 7.5 }vmin)` : null }`, zIndex: key } },
							e(
								'img',
								{ key: 'heat_map_bar' + key, src: `/assets/icons/${value > 4 ? 'extra' : value > 2 ? 'max' : value > 0 ? 'mid' : 'min'}-${theme}.svg`, style: { width: '11.7vmin', height: 'fit-content' } }
								)
							)
					}
				);
				return e(
						'div',
						{ key: 'heat_map_column' + key_row, className: 'heat_map_column' },
						bar
					)
			}
		);

		return e(
				React.Fragment,
				null,
				e(
					'div',
					{ className: 'heat_map_desktop' },
					mapDesktop
					),
				e(
					'div',
					{ className: 'heat_map_adaptive' },
					mapAdaptive
					)
			)
	}

	activityTitle (theme) {
		const title = e(
				'div',
				{ className: 'activity_title' },
				e(
					'div',
					{ className: 'activity_title_bar' },
					e(
						'img',
						{ src: `/assets/icons/activity_bar_${theme}_time.svg`, style: { width: '16vmin' } }
						),
					e(
						'span',
						{ className: 'activity_text desktop' },
						'2 часа'
						),
					e(
						'span',
						{ className: 'activity_text adaptive' },
						'1 час'
						)
					),
				e(
					'div',
					{ className: 'activity_title_bar' },
					e(
						'img',
						{ src: `/assets/icons/activity_bar_${theme}_min.svg`, style: { width: '16vmin' } }
						),
					e(
						'span',
						{ className: 'activity_text' },
						'0'
						)
					),
				e(
					'div',
					{ className: 'activity_title_bar' },
					e(
						'img',
						{ src: `/assets/icons/activity_bar_${theme}_mid.svg`, style: { width: '16vmin' } }
						),
					e(
						'span',
						{ className: 'activity_text' },
						'1 — 2'
						)
					),
				e(
					'div',
					{ className: 'activity_title_bar' },
					e(
						'img',
						{ src: `/assets/icons/activity_bar_${theme}_max.svg`, style: { width: '16vmin' } }
						),
					e(
						'span',
						{ className: 'activity_text' },
						'3 — 4'
						)
					),
				e(
					'div',
					{ className: 'activity_title_bar' },
					e(
						'img',
						{ src: `/assets/icons/activity_bar_${theme}_extra.svg`, style: { width: '16vmin' } }
						),
					e(
						'span',
						{ className: 'activity_text' },
						'5 — 6'
						)
					)			
			);
		return title;
	}

	render () {
		return e(
				'div',
				{ className: 'content_wrapper' },
				e(
					'div',
					{ className: 'columns', id: 'columns_activity' },
					this.heatMap(Object.values(this.props.data.data), this.props.theme),
					this.activityTitle(this.props.theme)
					)
			);
	}

}

class Canvas extends React.Component {

	constructor (props) {
		super(props);
		this.diagramRef = React.createRef();
		this.circleRef = React.createRef();
		this.state = { width: 500, lineWidth: 84, startAngle: -2 * Math.PI / 3, endAngle: -2 * Math.PI / 3, total: 0, dataDiagram: this.props.data.categories }
	}

	componentDidMount() {
		this.canvasOutput(this.props);
	}

	canvasStyle (key, context, theme) {
		if (theme == "dark") {
			if (key == 0) {
				var gradientLinear = context.createLinearGradient(10, 0, 0,200);
				gradientLinear.addColorStop(0, '#5B3A00CC');
				gradientLinear.addColorStop(.5, '#FFA300');
				gradientLinear.addColorStop(1, '#5B3A00CC');
			} else if (key == 1) {
				var gradientLinear = context.createLinearGradient(10, 200, 200,-100);
				gradientLinear.addColorStop(0, '#0F090080');
				gradientLinear.addColorStop(.5, '#633F00');
				gradientLinear.addColorStop(1, '#0F090080');
			} else if (key == 2) {
				var gradientLinear = context.createLinearGradient(300, 100, 600, 600);
				gradientLinear.addColorStop(0, '#38290080');
				gradientLinear.addColorStop(.5, '#9B9B9BE6');
				gradientLinear.addColorStop(1, '#38290080');
			} else if (key == 3) {
				var gradientLinear = context.createLinearGradient(0, 100, 400, 100);
				gradientLinear.addColorStop(0, '#38290080');
				gradientLinear.addColorStop(.5, '#4D4D4D');
				gradientLinear.addColorStop(1, '#38290080');
				
			}
		context.shadowBlur = 3;
		} else if (theme == "light") {
			if (key == 0) {
				var gradientLinear = context.createLinearGradient(10, 0, 0,200);
				gradientLinear.addColorStop(0, '#FFEF99');
				gradientLinear.addColorStop(.5, '#FFB800');
				gradientLinear.addColorStop(1, '#FFEF99');
			} else if (key == 1) {
				var gradientLinear = context.createLinearGradient(0, 50, -600, 600);
				gradientLinear.addColorStop(0, '#FFEF99E6');
				gradientLinear.addColorStop(.2, '#FFB800E6');
				gradientLinear.addColorStop(1, '#FFEF99E6');
			} else if (key == 2) {
				var gradientLinear = context.createLinearGradient(-200, 300, 100, 500);
				gradientLinear.addColorStop(0, '#CBCBCBE6');
				gradientLinear.addColorStop(.9, '#A6A6A6E6');
				gradientLinear.addColorStop(1, '#CBCBCBE6');
			} else if (key == 3) {
				var gradientLinear = context.createLinearGradient(-100, 300, 300, 300);
				gradientLinear.addColorStop(0, '#E4E4E4');
				gradientLinear.addColorStop(.9, '#BFBFBF');
				gradientLinear.addColorStop(1, '#E4E4E4');
				
			}
		}
		context.lineWidth = this.state.lineWidth;
		context.shadowColor = key == 0 ? '#FFA200E6' : key == 1 ? '#CA8100E6' : key == 2 ? '#000000' : key == 3 ? '#262626' : null;
		context.strokeStyle = gradientLinear;
	}

	createSlice (key, context, theme) {
		context.beginPath();
		context.arc(this.state.width/2+this.state.lineWidth/2, this.state.width/2+this.state.lineWidth/2, this.state.width/2, this.state.startAngle, this.state.endAngle, false);
		this.canvasStyle(key, context, theme);
		context.stroke();
	}

	createCircle (key, context, theme) {
		context.beginPath();
		context.arc(50, 50, 25, 0, 2*Math.PI);
		this.canvasStyle(key, context, theme);
		context.shadowBlur = 3;
		context.lineWidth = 50;
		context.stroke();
	}

	canvasOutput (props) {
		if (props.type == 'diagram') {
			this.state.dataDiagram.forEach((value, key) => {
					this.state.dataDiagram[key] = parseInt(value.valueText);
					this.setState({ total: this.state.total += this.state.dataDiagram[key] })
				}
			);
			this.state.dataDiagram.forEach((value, key) => {
				this.state.dataDiagram[key] = 2 * Math.PI * value / this.state.total;
				}
			);
			for (var i = 0; i < 4; i++) {
				this.setState({ startAngle: i ? this.state.startAngle += this.state.dataDiagram[i - 1] : null, endAngle: this.state.endAngle += this.state.dataDiagram[i] })
				this.createSlice(i, this.diagramRef.current.getContext('2d'), props.theme);
			}
		} else if (props.type == 'circle') {
			this.createCircle(props.index, this.circleRef.current.getContext('2d'), props.theme);
		}
	}

	render () {
		if (this.props.type == 'diagram') {
			return e(
				'canvas',
				{ id: this.props.type, width: '600', height: '600', ref: this.diagramRef }
			)
		} else if (this.props.type == 'circle') {
			return e(
				'canvas',
				{ id: this.props.type, width: '100', height: '100', ref: this.circleRef }
			)
		}
	}

}

class NavigationButtons extends React.Component {

	constructor (props) {
		super(props);
	}

	buttons (props) {
		if (props.type == 'desktop')
			return e(
				'div',
				{ className: 'navigation_buttons' },
				e(
					'button',
					{ className: 'navigation_button', id: 'navigation_upper', 'disabled': true },
					e(
						'img',
						{ src: `/assets/icons/button-${props.theme}.svg` }
						)
					),
				e(
					'button',
					{ className: 'navigation_button', id: 'navigation_lower', 'active': 'true' },
					e(
						'img',
						{ src: `/assets/icons/button-hover-${props.theme}.svg` }
						)
					)
				)
		return e(
					'button',
					{ className: 'navigation_button', id: `navigation_${props.type}`, 'adaptive': '' },
					e(
						'img',
						{ src: `/assets/icons/${(props.type == 'upper') ? `button-${props.theme}.svg` : `button-hover-${props.theme}.svg`}` }
						)
					)
	}

	render () {
		return e(
			this.buttons,
			{ offset: this.props.offset, theme: this.props.theme, size: this.props.size, type: this.props.type, active: this.props.active }
			)
	}

}

class UserCard extends React.Component { // Класс, возвращающий React объект карточки пользователя.

	constructor (props) {
		super(props);
	}

	card (props) {
		if (props.wrapped) {
			return e(
					'div',
					{ className: `userCard_wrapper${ props.active ? ' voted' : '' }` },
					e(
					'div',
					{ className: props.type, id: 'userCard' },
					e(
						UserAvatar, 
						{ avatar: props.avatar, icon: props.icon }
						), // Создаем объект класса UserAvatar, в который передаем параметры наличия иконки и название иконки.
					e(
						'div',
						{ className: 'username' },
						props.name
						), // Создаем объект 'div' с именем участника.
					e(
						UserInfo,
						{ userInfo: props.info }
						)
					)
				)
		} else {
			return e(
					'div',
					{ className: props.type, id: `${(props.min) ? 'userCard_min' : 'userCard' }` },
					e(
						UserAvatar, 
						{ avatar: props.avatar, icon: props.icon }
						), // Создаем объект класса UserAvatar, в который передаем параметры наличия иконки и название иконки.
					e(
						'div',
						{ className: 'userCard_bio' },
						e(
							'div',
							{ className: 'username' },
							props.name
							), // Создаем объект 'div' с именем участника.
						e(
							UserInfo,
							{ userInfo: props.info }
							)
						)
					)
		}
	}

	render () {
		return e(
				this.card,
				{ wrapped: this.props.wrapped, active: this.props.active, min: this.props.min, type: this.props.type, className: this.props.type, id: 'userCard', avatar: this.props.avatar, icon: this.props.icon, name: this.props.name, info: this.props.info }
			)
	}

}

class UserAvatar extends React.Component { // Класс, возвращающий React объект пользовательского аватара.
	
	constructor (props) {
		super(props);
	}

	icon (props) { // Метод, который возвращает объект иконки, если данному пользователю она принадлежит, иначе пустой объект.
		if (props.icon == 'thumb-up')
			return e(
					'span',
					{ id: 'avatar_icon' },
					e(
						'object',
						{ type: 'image/svg+xml', data: `/assets/icons/${props.icon}.svg` }
						)
				)
		else if (props.icon) 
			return e(
					'span',
					{ id: 'avatar_icon' },
					props.icon
				)
		return null;
	}

	render () {
		return e(
				'div',
				{ className: 'avatar' },
				e(
					this.icon, 
					{ icon: this.props.icon }
					), // Обращаемся к методу icon, для создания объекта иконки, если требуется.
				e(
					'img',
					{ src: `/assets/images/4x/${this.props.avatar}`, alt: 'Avatar' }
					)
			)
	}

}

class UserInfo extends React.Component { // Класс, возвращающий React объект подписи количества очков.
	
	constructor (props) {
		super(props);
	}

	info (props) { // Метод, который возвращает объект количества коммитов, если указано в создании объекта UserCard, иначе пустой объект.
		if (props.userInfo)
			return e(
				'div',
				{ className: 'information' },
				props.userInfo
				)
		return null;
	}

	render () {
		return e(
				this.info,
				{ userInfo: this.props.userInfo }
			) // Обращаемся к методу info, для создания объекта количества коммитов, если требуется.
	}

}

window.renderTemplate = function (alias, data) {
	return ReactDOM.render(e(RootRender, { alias: alias, data: data }), document.querySelector("#root")); 
}