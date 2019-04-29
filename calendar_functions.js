$().ready(function(){
	function buildDateForm() {
		$( "#myCal" ).empty();  //removes previous year if there
		$('#datePicker').append('<select id="year"></select> ');
		for(i = 1990; i < 2021; i++) {
		$('#year').append('<option value="'+i+'">'+i+'</option> ')
		}
		$('#datePicker').append('<button id="submit">Go!</button>');

		// set date to current year by default
		var d = new Date();
		var y = d.getFullYear();
		$('#year option[value="'+y+'"]').prop('selected', true);
	}

	function eventForm() {
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		$('#eventDate').append('<input id="name" type="text" value="Xmas"> ');
		$('#eventDate').append('<select id="month"></select> ');
		for(var i = 0; i < months.length;i++) {
			$('#month').append('<option value="'+i+'">'+months[i]+'</option> ')
		}
		$('#eventDate').append('<select id="day"></select> ');
		for(i = 1; i < 31; i++) {
			$('#day').append('<option value="'+i+'">'+i+'</option> ')
		}
		$('#eventDate').append('<select id="years"></select> ');
		for(i = 1990; i < 2021; i++) {
			$('#years').append('<option value="'+i+'">'+i+'</option> ')
		}
		$('#eventDate').append('<button id="submit2">Add</button> ');

		// set date to current month and year
		var d = new Date();
		var n = d.getMonth();
		var y = d.getFullYear();
		$('#month option:eq(11)').prop('selected', true);
		$('#day option[value="25"]').prop('selected', true);
		$('#years option[value="'+y+'"]').prop('selected', true);
		
	}
	
	function addEvent(name, month, day, year) {
		month = parseInt(month, 10) + 1;
		console.log(name, day, month, year);
		$('#my'+month+' #day'+day).append('<br>'+name);
	}



	function calendar(date) {
		$( ".myCal" ).empty();
		if (date == null) {
				date = new Date;
		}
		day = date.getDate();
		month = date.getMonth();
		year = date.getFullYear();
		months = new // array for months, first month is placeholder as 0 does not seem to work as an id
		Array('Placeholder', 'January','February','March','April','May','June',
		'July','August','September','October','November','December');
		
		// loop for each month table
		for(month = 1; month < 13; month++){
			this_month = new Date(year, month, 1);
			next_month = new Date(year, month + 1, 1);
			days = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri',
			'Sat');
			first_week_day = this_month.getDay(); 
			// day of the week of the first day
			days_in_this_month = Math.round((next_month.getTime() - this_month.getTime()) / (1000 * 60 * 60 * 24));
			// all id have been modified to store month number
			$('#'+month).append('<h1>'+months[month]+' </h1><table id="my'+month+'"></table>');
			$('#my'+month).append('<thead><tr></tr></thead>');
			for (var i=0; i < days.length; i++) {
				$('#my'+month+' thead tr').append('<th>'+days[i]+'</th>')
			}
			// create table body and first row
			$('#my'+month).append('<tbody></tbody>');
			$('#my'+month+' tbody').append('<tr>');
			
			// creates spacing for first week if necessary
			for(week_day = 0; week_day < first_week_day; week_day++) {
				$('#my'+month+' tbody tr').append('<td> </td>');
			}
			
			for (day_counter=1; day_counter <= days_in_this_month; day_counter++) {
					if (week_day == 7) {
						// go to the next line of the calendar
						$('#my'+month+' tbody').append('</tr><tr>');
						week_day=0;
					}
				$('#my'+month+' tbody tr:last').append('<td id="day'+day_counter+'">' + day_counter + '</td>');
				week_day++;}
		}

		}

	// calls	
	buildDateForm();
	eventForm();
	calendar();
	// listener for clicks on the submit button
	$("#submit").click(function() {
		var newYear = $('#year').val();
		var newDate = new Date(newYear, 0,  1);
		calendar(newDate);
		return false;
	});
	$("#submit2").click(function() {
		var name = $('#name').val();
		var newMonth = $('#month').val();
		var newYear = $('#years').val();
		var newDay = $('#day').val();
		addEvent(name, newMonth, newDay, newYear);
		return false;
	});	
});