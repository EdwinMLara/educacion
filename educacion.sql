-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-10-2022 a las 21:57:28
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `educacion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `idAlumno` int(11) NOT NULL,
  `nombre` int(11) NOT NULL,
  `fechaNacimiento` int(11) NOT NULL,
  `curp` int(11) NOT NULL,
  `nivelEstudios` int(11) NOT NULL,
  `promedioReciente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datospadre`
--

CREATE TABLE `datospadre` (
  `idPadre` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `telefono` int(11) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `curp` varchar(20) NOT NULL,
  `calle` varchar(50) NOT NULL,
  `no` int(11) NOT NULL,
  `colonia` varchar(50) NOT NULL,
  `cp` int(11) NOT NULL,
  `municipio` varchar(20) NOT NULL,
  `gradoEstudios` varchar(50) NOT NULL,
  `trabajo6Meses` int(11) NOT NULL,
  `motivoNoTrabajo` int(11) NOT NULL,
  `seguroMedico` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `escuelainstitucion`
--

CREATE TABLE `escuelainstitucion` (
  `idEscuela` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `calle` varchar(50) NOT NULL,
  `no` int(11) NOT NULL,
  `colonia` varchar(50) NOT NULL,
  `municipio` varchar(20) NOT NULL,
  `telefono` int(11) NOT NULL,
  `tipoInstitucion` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `escuelainstitucion`
--

INSERT INTO `escuelainstitucion` (`idEscuela`, `nombre`, `calle`, `no`, `colonia`, `municipio`, `telefono`, `tipoInstitucion`) VALUES
(1, 'Escuela1', 'calle1', 1, 'colonia1', 'municipio1', 0, 'tipo1'),
(2, 'Escuela1', 'calle1', 1, 'colonia1', 'municipio1', 0, 'tipo1'),
(3, 'Escuela2', 'calle2', 2, 'colonia2', 'municipio2', 0, 'tipo2'),
(4, 'Escuela2', 'calle2', 2, 'colonia2', 'municipio2', 0, 'tipo2'),
(5, 'Escuela3', 'calle3', 3, 'colonia3', 'municipio3', 0, 'tipo3'),
(6, 'Escuela3', 'calle3', 3, 'colonia3', 'municipio3', 0, 'tipo3'),
(7, 'Escuela4', 'calle4', 4, 'colonia4', 'municipio4', 0, 'tipo4'),
(8, 'Escuela4', 'calle4', 4, 'colonia4', 'municipio4', 0, 'tipo4'),
(9, 'Escuela5', 'calle5', 5, 'colonia5', 'municipio5', 0, 'tipo5'),
(10, 'Escuela5', 'calle5', 5, 'colonia5', 'municipio5', 0, 'tipo5'),
(11, 'Univesidad de Guanajuato', 'avenida univesidad', 10, 'yacatitas', 'yuriria', 2147483647, 'nose');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingresosfamiliares`
--

CREATE TABLE `ingresosfamiliares` (
  `idIngresosFamiliares` int(11) NOT NULL,
  `idAlumno` int(11) NOT NULL,
  `ingresoPapa` int(11) NOT NULL,
  `IngresoMama` int(11) NOT NULL,
  `ingresoHermanos` int(11) NOT NULL,
  `ingresoAbuelos` int(11) NOT NULL,
  `personasDependientes` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `requisitosadicionales`
--

CREATE TABLE `requisitosadicionales` (
  `idRequisitosAdicionales` int(11) NOT NULL,
  `escuelaDetroMunicipio` tinyint(1) NOT NULL,
  `tiempoTraslado` int(1) NOT NULL,
  `tipoTrasporte` varchar(20) NOT NULL,
  `tipoTechoCasa` varchar(20) NOT NULL,
  `aguaEnCasa` varchar(20) NOT NULL,
  `tipoMaterialPisoCasa` varchar(20) NOT NULL,
  `tipoMaterialMurosCasa` varchar(20) NOT NULL,
  `recibeOtroApoyo` tinyint(1) NOT NULL,
  `tipoApoyo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `idServicios` int(11) NOT NULL,
  `callesPavimentadas` tinyint(1) NOT NULL,
  `drenaje` tinyint(1) NOT NULL,
  `biblioteca` tinyint(1) NOT NULL,
  `recolecionBasura` tinyint(1) NOT NULL,
  `alumbradoPublico` tinyint(1) NOT NULL,
  `telefonoPublico` tinyint(1) NOT NULL,
  `transportePublico` tinyint(1) NOT NULL,
  `aguaPotable` tinyint(1) NOT NULL,
  `juegosOCanchas` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes`
--

CREATE TABLE `solicitudes` (
  `idSolicitud` int(11) NOT NULL,
  `idAlumno` int(11) NOT NULL,
  `idEscuela` int(11) NOT NULL,
  `idPadre` int(11) NOT NULL,
  `idServicios` int(11) NOT NULL,
  `idRequisitosAdicionales` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuarios` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(33) NOT NULL,
  `tipoCuenta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuarios`, `username`, `password`, `tipoCuenta`) VALUES
(4, 'Editing', 'C1E756E49D5000FECA7BE82506D57E6B', 2),
(8, 'EdwinMLara', '085E29968AC0CE462A107E19834F5D82', 1),
(9, 'Prueba1', 'admin', 1),
(10, 'Prueba2', 'admin', 1),
(11, 'Prueba3', 'admin', 1),
(12, 'Prueba4', 'admin', 1),
(13, 'Prueba5', 'admin', 1),
(14, 'Prueba6', 'admin', 1),
(15, 'Prueba7', 'admin', 1),
(16, 'Prueba8', 'admin', 1),
(17, 'Prueba9', 'admin', 1),
(18, 'Prueba11', 'admin', 1),
(19, 'Prueba12', 'admin', 1),
(20, 'Prueba13', 'admin', 1),
(21, 'Prueba14', 'admin', 1),
(22, 'Prueba15', 'admin', 1),
(23, 'Prueba16', 'admin', 1),
(24, 'Prueba17', 'admin', 1),
(25, 'Prueba18', 'admin', 1),
(26, 'Prueba19', 'admin', 1),
(27, 'FelixTest', 'A8090463B3B0D5D34F0297B0E7A13DAE', 2),
(28, 'Otrod', 'A717083FD9D8E50BFA001179F50046D8', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`idAlumno`);

--
-- Indices de la tabla `datospadre`
--
ALTER TABLE `datospadre`
  ADD PRIMARY KEY (`idPadre`);

--
-- Indices de la tabla `escuelainstitucion`
--
ALTER TABLE `escuelainstitucion`
  ADD PRIMARY KEY (`idEscuela`);

--
-- Indices de la tabla `ingresosfamiliares`
--
ALTER TABLE `ingresosfamiliares`
  ADD PRIMARY KEY (`idIngresosFamiliares`),
  ADD KEY `FK_ingresosFamiliares` (`idAlumno`);

--
-- Indices de la tabla `requisitosadicionales`
--
ALTER TABLE `requisitosadicionales`
  ADD PRIMARY KEY (`idRequisitosAdicionales`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`idServicios`);

--
-- Indices de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD PRIMARY KEY (`idSolicitud`),
  ADD KEY `FK_idEscuela` (`idEscuela`),
  ADD KEY `FK_idServicios` (`idServicios`),
  ADD KEY `FK_datosAlumnos` (`idPadre`),
  ADD KEY `FK_idRequisitosAdicionales` (`idRequisitosAdicionales`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuarios`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `idAlumno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `datospadre`
--
ALTER TABLE `datospadre`
  MODIFY `idPadre` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `escuelainstitucion`
--
ALTER TABLE `escuelainstitucion`
  MODIFY `idEscuela` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `ingresosfamiliares`
--
ALTER TABLE `ingresosfamiliares`
  MODIFY `idIngresosFamiliares` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `requisitosadicionales`
--
ALTER TABLE `requisitosadicionales`
  MODIFY `idRequisitosAdicionales` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `idServicios` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  MODIFY `idSolicitud` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ingresosfamiliares`
--
ALTER TABLE `ingresosfamiliares`
  ADD CONSTRAINT `FK_ingresosFamiliares` FOREIGN KEY (`idAlumno`) REFERENCES `solicitudes` (`idSolicitud`);

--
-- Filtros para la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD CONSTRAINT `FK_datosAlumnos` FOREIGN KEY (`idPadre`) REFERENCES `datospadre` (`idPadre`),
  ADD CONSTRAINT `FK_idEscuela` FOREIGN KEY (`idEscuela`) REFERENCES `escuelainstitucion` (`idEscuela`),
  ADD CONSTRAINT `FK_idRequisitosAdicionales` FOREIGN KEY (`idRequisitosAdicionales`) REFERENCES `requisitosadicionales` (`idRequisitosAdicionales`),
  ADD CONSTRAINT `FK_idServicios` FOREIGN KEY (`idServicios`) REFERENCES `servicios` (`idServicios`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
