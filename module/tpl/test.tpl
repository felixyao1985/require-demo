<div id="patientreg" class="block">
	
	<div id="user-base-info">
		<span id="spanName"></span>
		<span id="spanBirthday"></span>
		<span id="spanSex"></span>
		<span id="spanIDCard"></span>
		<span id="spanPhone"></span>
	</div>
	<div class="slices">
		<div class="midde" id="<%= _.uniqueId('slices-') %>"> 
			<div <%_.bind(nextClick,{},this) %>>
				<input type="text" name="Name" id="txtName" description="DisplayUserName" placeholder="姓名" maxlength="10" />
			</div>
		</div>
		<div class="midde" style="display:none" id="<%=_.uniqueId('slices-') %>"> 
			<div>
				<input type="text" name="IDCard" id="txtIDCard" description="IDCard" placeholder="身份证" maxlength="18"/>
			</div>
		</div>	
		<div class="midde" style="display:none" id="<%= _.uniqueId('slices-') %>"> 
			<div>
				<input type="text" name="Phone" id="txtPhone" description="Phone" placeholder="手机" maxlength="11"/>
			</div>
		</div>	
	</div>

	<div class="midde operation">
		<button type="button" description="btnPrev" id="btnPrev" style="display:none">上一步</button>
		<button type="button" description="btnNext" id="btnNext">下一步</button>
		<button type="button" description="btnSend" id="btnSend" style="display:none">提交</button>
	</div>

</div>