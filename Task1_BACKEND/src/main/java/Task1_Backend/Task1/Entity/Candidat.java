package Task1_Backend.Task1.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;


@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name= "Candidat")
public class Candidat {


	private Long id;

	private String name;

	private Double score;

	private LocalDate dateNaissance;


}
