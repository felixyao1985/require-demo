//定义了一个模块。
define(['properties'],function(properties){
	var string = {
		tips:properties.$i18n.prop('sysInfo'),
		error_parm:properties.$i18n.prop('error_parm'),
		error:properties.$i18n.prop('error'),
		success:properties.$i18n.prop('success'),
		delsuccess:properties.$i18n.prop('delsuccess'),
		cancel:properties.$i18n.prop('cancel'),
		search:properties.$i18n.prop('search'),
		searchall:properties.$i18n.prop('searchall'),	
		logo:properties.$i18n.prop('logo'),	
		ConsultDoctor:properties.$i18n.prop('ConsultDoctor'),
		Disease:properties.$i18n.prop('Disease'),	
		Treatment:properties.$i18n.prop('Treatment'),
		Healthinfo:properties.$i18n.prop('Healthinfo'),	
		moredoctor:properties.$i18n.prop('MoreDoctor'),
		HotTag:properties.$i18n.prop('HotTag'),	
		HistoryTag:properties.$i18n.prop('HistoryTag'),
		OK:properties.$i18n.prop('OK'),
		kbase:properties.$i18n.prop('KBase'),
		Specifications:properties.$i18n.prop('Specifications'),
	}

	var tips = {
		ConsultHaveSurplus:function(p){return properties.$i18n.prop('TipsConsultHaveSurplus',p)},
		ConsultError:properties.$i18n.prop('TipsConsultError'),
		ConsultNoSurplus:properties.$i18n.prop('TipsConsultNoSurplus'),	
		ConsultDescription:properties.$i18n.prop('ConsultDescription'),	
		FormError:properties.$i18n.prop('TipsFormError'),				
	}

	var classifier = {
		grain:properties.$i18n.prop('grain'),
		package:properties.$i18n.prop('package'),
		slice:properties.$i18n.prop('slice'),	
		agent:properties.$i18n.prop('agent'),	
		needle:properties.$i18n.prop('needle'),
		ml:properties.$i18n.prop('ml'),	
		mg:properties.$i18n.prop('mg'),			
	}

	return {
		string: string,
		tips: tips,
		classifier: classifier,
	};
});
