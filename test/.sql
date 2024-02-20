/*
update table and add it the foreing key with an restrict  option.
*/

ALTER TABLE solicitudes
ADD CONSTRAINT fk_solicitudes_alumnos 
FOREIGN KEY (idAlumno) 
REFERENCES alumno(idAlumno) 
ON DELETE CASCADE;

ALTER TABLE escuelas
ADD CONSTRAINT fk_escuelas_alumnos
FOREIGN KEY (idAlumno)
REFERENCES alumno(idAlumno)
ON DELETE CASCADE;


ALTER TABLE solicitudes
ADD CONSTRAINT fk_solicitudes_escuelas
FOREIGN KEY (idEscuela)
REFERENCES escuelas(idEscuela)



/*
se va agragar un disparador  para que cuando se inserte o actualice una solicitud, 
*/

DELIMITER 
|
    CREATE TRIGGER insertSolicitud AFTER INSERT ON alumnos
    FOR EACH ROW
    BEGIN
        INSERT INTO solicitudes (idAlumno,idEscuela)
        VALUES (NEW.idAlumno,NULL);
    END; 
|

/*
se va agregra disparador para cuando se inserte una escuela y se actuliza el id de escuelas en solicitudes, 
*/

DELIMITER
|
    CREATE TRIGGER updateSolicitudidEscuela AFTER INSERT ON escuelas
    FOR EACH ROW
    BEGIN 
        DECLARE idSolicitudAux INT; 

        SELECT idSolicitud INTO idSolicitudAux 
        FROM solicitudes WHERE solicitudes.idAlumno = NEW.idAlumno
        ORDER BY idSolicitud ASC LIMIT 1; 

        UPDATE solicitudes 
        SET idEscuela = NEW.idEscuela 
        WHERE idSolicitud = idSolicitudAux; 
    END;
|

/*
Prueba de insertar un alumno
*/

INSERT INTO `alumnos`(`nombre`) VALUES ('Edwin Miguel Lara Espinoza');
INSERT INTO `escuelas`( `idAlumno`, `nombre`) VALUES (1,'universidad de guanajuato');


DELIMITER
|
	CREATE TRIGGER eliminarTodoSolictud2 BEFORE DELETE ON solicitudes
    FOR EACH ROW
    BEGIN
    	DECLARE idEscuelaAux,idPadreAux,idIngresosFamiliaresAux,idServiciosAux,idRequisitosAdicionalesAux INT;
        
        SELECT solicitudes.idEscuela,solicitudes.idPadre,
        solicitudes.idIngresosFamiliares,solicitudes.idServicios, solicitudes.idRequisitosAdicionales 
        INTO idEscuelaAux, idPadreAux, idIngresosFamiliaresAux, idServiciosAux, idRequisitosAdicionalesAux
        FROM solicitudes WHERE solicitudes.idSolicitud = OLD.idSolicitud;
        
        DELETE FROM escuela WHERE idEscuela = idEscuelaAux;
        DELETE FROM padre WHERE idPadre = idPadreAux;
        DELETE FROM ingresosfamiliares WHERE idIngresosFamiliares = idIngresosFamiliaresAux;
        DELETE FROM servicios WHERE idServicios = idServiciosAux;
        DELETE FROM requisitosadicionales WHERE idRequisitosAdicionales = idRequisitosAdicionalesAux;
        
    END;;
|



/*
INSERTAR ALUMNO 
*/

INSERT INTO `alumnos`(`curp`, `email`, `nombre`, `fechaNacimiento`, `file`) 
VALUES ('LAEE920717HMCRSD09','em.laraespinoza@hotmail.com','Edwin Miguel Lara Espinoza','1992-07-17','base64:/')

/*
INSERTAR ESCUELA
*/

INSERT INTO `escuela`( `idAlumno`, `nombre`, `calle`, `no`, `colonia`, `municipio`, `cp`, `telefono`, `tipoInstitucion`, `file`) VALUES (34,'Universidad de Guanajauto','Av. universidad','s/n','Yacatitas','Yuriria','38980','4451107150','publica','base64/')


/*
INSERTAR  PADRE
*/

INSERT INTO `padre`(`idAlumno`, `curp`, `nombre`, `telefono`, `fechaNacimiento`, `calle`, `no`, `colonia`, `cp`, `municipio`, `gradoEstudios`, `referenciaNombre`, `referenciaTelefono`, `trabajo6meses`, `motivoNoTrabajo`, `seguroMedico`, `file`) VALUES (36,'LAGJ651118HDFRTN01','Juan Enrique Lara Gutierrez','4454581915','1965-11-18','2da privada 5 de febrero','87','niños heroes','38850','Moroleon','secundaria','Hilda Espinoza Moreono','4451107150','si','Sin motivo','Ninguno','base64/')

/*
INSERTAR INGRESOS FAMILIARES
*/

INSERT INTO `ingresosfamiliares`(`idAlumno`, `ingresoPapa`, `ingresoMama`, `ingresoHermanos`, `ingresoAbuelos`, `personasDependientes`, `file`) 
VALUES (36,1000,1000,1000,6000,8,'base64')