<div id="doctor-list" class="doctor-list block mb-noline">
	<%_.each(items,function(item,i){%>
		<div class="row-fluid row-list mb">
			<div class="span3 item-pic float-left goto-view " mid="<%= item.DoctorID %>"><img class="imgload" src="module/img/doctor.png" src-temp="<%= item.DoctorAvator %>"></img></div>
			<div class="<% if(displayoptions){ %>span6<% }else{ %>span9<% } %> content float-left">
				<p><b class="title"><%= item.DoctorName %></b> <%= item.HospitalName %></p>
				<p class="contents"><%= item.Description %></p>
			</div>
			<% if(displayoptions){ %>
			<div class="span3 float-right options">
				<a  class="inquiry" mid="123"><font description="ASK">提问</font></a>
			</div>	
			<% } %>
		</div>
	<%})%>
</div>