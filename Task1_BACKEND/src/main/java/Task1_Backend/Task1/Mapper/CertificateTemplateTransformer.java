package Task1_Backend.Task1.Mapper;

import Task1_Backend.Task1.Dto.CertificateTemplateDTO;
import Task1_Backend.Task1.Entity.CertificateTemplate;
import org.springframework.stereotype.Component;

@Component
public class CertificateTemplateTransformer {

	public CertificateTemplateDTO toDTO(CertificateTemplate certificateTemplate) {
		return CertificateTemplateDTO.builder()
				.id(certificateTemplate.getId())
				.name(certificateTemplate.getName())
				.templatePath(certificateTemplate.getTemplatePath())
				.build();
	}

	public CertificateTemplate toEntity(CertificateTemplateDTO certificateTemplateDTO) {
		return CertificateTemplate.builder()
				.id(certificateTemplateDTO.getId())
				.name(certificateTemplateDTO.getName())
				.templatePath(certificateTemplateDTO.getTemplatePath())
				.build();
	}
}
