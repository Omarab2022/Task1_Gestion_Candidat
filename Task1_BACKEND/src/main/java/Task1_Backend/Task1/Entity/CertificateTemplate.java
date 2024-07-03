package Task1_Backend.Task1.Entity;


import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CertificateTemplate {


	private Long id;

	private String name;
	
	private String templatePath;


}
