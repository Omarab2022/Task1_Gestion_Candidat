package Task1_Backend.Task1.Controllers;

import Task1_Backend.Task1.Dto.CertificateTemplateDTO;
import Task1_Backend.Task1.Services.CertificateTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/certificateTemplate")
public class CertificateTemplateController {


	@Autowired
	private CertificateTemplateService certificateTemplateService;

	public CertificateTemplateController(CertificateTemplateService certificateTemplateService) {
		this.certificateTemplateService = certificateTemplateService;
	}

	@GetMapping("/all")
	public List<CertificateTemplateDTO> getAllTemplates() {
		return certificateTemplateService.getAllTemplates();
	}

	@GetMapping("/numberoftemplates")
	public Long getNumberOfTemplates() {
		return certificateTemplateService.getNumberOfTemplates();
	}
}
