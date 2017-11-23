var server = "http://52.173.33.218:8080";

$("#submit").click(function() {
	$("#serviceTable tbody").empty();
	$("#addRow").show();
	$('#update').hide();
	$('#cancelUpdate').hide();
	$('#add').hide();
	$('#cancelAdd').hide();
	
	var url = server + "/rates";
	$.get( url, function( data ) {
		createTable(data);
	});
});

function createTable(data) {
	$('.tableContent').show();
	for(var i=0; i<data.length; i++) {
		var slNo = i + 1;
		newRowContent =  "<tr><td class='hidden rowValue'>" + data[i].id +" </td> \
				<td><input type='checkbox' name='record' class='editRecord'></td> \
				<td class='slNo'>" + slNo +" </td> \
				<td class='serviceType'>" + data[i].serviceType +" </td> \
				<td class='packageType'>" + data[i].packageType +" </td> \
				<td class='origPostCode'>" + data[i].originPostalCode +" </td> \
				<td class='destpostCode'>" + data[i].destinationPostalCode +" </td> \
				<td class='rate'>"+ data[i].rate +"</td></tr>";
				
		$('#serviceTable > tbody:last-child').append(newRowContent);
	}
};

$("#serviceTable").on("click", ".editRecord", function(){
    $(this).addClass("active");
	var row = $(this).closest("tr");
	
	$("#serviceTable").find('tr').each(function() {
		$(this).find('.editRecord').attr("disabled", true);
	});
	
	$("#addRow").hide();
	$('#update').show();
	$("#cancelUpdate").show();
	$('#add').hide();
	$('#cancelAdd').hide();
	
	var rate = row.find('.rate').text();
	row.find('.rate').html($("<input class='form-control editValue rateVal'/>",{"value" : rate}).val(rate));
});

$("#update").click(function() {
	updateTableData();
});

function updateTableData() {
	var row = $("#serviceTable").find('.active').closest("tr");
	var rowValue = row.find('.rowValue').text();
	var serviceType = row.find('.serviceType').text();
	var packageType = row.find('.packageType').text();
	var origPostCode = row.find('.origPostCode').text();
	var destpostCode = row.find('.destpostCode').text();
	var rate = row.find('.rateVal').val();
	
	var item = {};
	item ["id"] = rowValue.trim();
	item ["originPostalCode"] = origPostCode.trim();
	item ["destinationPostalCode"] = destpostCode.trim();
	item ["packageType"] = packageType.trim();
	item ["serviceType"] = serviceType.trim();
	item ["rate"] = rate.trim();
	
	row.find('.editRecord').attr('checked', false);
	row.find('.editRecord').removeClass("active");
	
	$("#serviceTable").find('tr').each(function() {
		if(!($(this).find('.editRecord').hasClass('active'))) {
			$(this).find('.editRecord').attr("disabled", false);
		}
	});
	
	var url = server + "/rates";
	$.ajax({
		type: "PUT",
		url: url,
		contentType: "application/json",
		data: JSON.stringify(item)
	});
	
	row.find('.rate').html(rate);
	
	$("#addRow").show();
	$('#update').hide();
	$('#cancelUpdate').hide();
	$('#add').hide();
	$('#cancelAdd').hide();
}

$("#addRow").click(function() {
	$("#addRow").hide();
	$('#update').hide();
	$('#cancelUpdate').hide();
	$('#add').show();
	$('#cancelAdd').show();
	
	var slNo = $('#serviceTable tr:last-child').find('.slNo').text();
	var num = parseInt(slNo) + 1;
	newRowContent =  "<tr><td><input type='checkbox' name='record' class='editRecord active'></td> \
				<td class='slNo'>" + num + "</td> \
				<td class='serviceType'><input class='form-control editValue serviceTypeVal'/></td> \
				<td class='packageType'><input class='form-control editValue packageTypeVal'/></td> \
				<td class='origPostCode'><input class='form-control editValue origPostCodeVal'/></td> \
				<td class='destpostCode'><input class='form-control editValue destpostCodeVal'/></td> \
				<td class='rate'><input class='form-control editValue rateVal'/></td></tr>";
				
	$('#serviceTable > tbody:last-child').append(newRowContent);
		
	$("#serviceTable").find('tr').each(function() {
		$(this).find('.editRecord').attr("disabled", true);
	});
});

$('#add').click(function() {
	var row = $("#serviceTable").find('.active').closest("tr");
	var serviceType = row.find('.serviceTypeVal').val();
	var packageType = row.find('.packageTypeVal').val();
	var origPostCode = row.find('.origPostCodeVal').val();
	var destpostCode = row.find('.destpostCodeVal').val();
	var rate = row.find('.rateVal').val();
	
	var item = {};
	item ["originPostalCode"] = origPostCode.trim();
	item ["destinationPostalCode"] = destpostCode.trim();
	item ["packageType"] = packageType.trim();
	item ["serviceType"] = serviceType.trim();
	item ["rate"] = rate.trim();
	
	console.log(item);
	
	var url = server + "/rates";
	$.ajax({
		type: "POST",
		url: url,
		contentType: "application/json",
		data: JSON.stringify(item)
	});
	
	row.find('.editRecord').removeClass("active");
	row.find('.serviceType').html(serviceType);
	row.find('.packageType').html(packageType);
	row.find('.origPostCode').html(origPostCode);
	row.find('.destpostCode').html(destpostCode);
	row.find('.rate').html(rate);
});