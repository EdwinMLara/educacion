-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-12-2022 a las 20:53:21
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
  `curp` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `fechaNacimiento` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `escuela`
--

CREATE TABLE `escuela` (
  `idEscuela` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `calle` varchar(50) NOT NULL,
  `no` varchar(10) NOT NULL,
  `colonia` varchar(20) NOT NULL,
  `municipio` varchar(30) NOT NULL,
  `cp` varchar(10) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `tipoInstitucion` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingresosfamiliares`
--

CREATE TABLE `ingresosfamiliares` (
  `idIngresosFamiliares` int(11) NOT NULL,
  `ingresoPapa` int(11) NOT NULL,
  `ingresoMama` int(11) NOT NULL,
  `ingresoHermanos` int(11) NOT NULL,
  `ingresoAbuelos` int(11) NOT NULL,
  `personasDependientes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `padre`
--

CREATE TABLE `padre` (
  `idPadre` int(11) NOT NULL,
  `curp` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `fechaNacimiento` varchar(20) NOT NULL,
  `calle` varchar(50) NOT NULL,
  `no` varchar(10) NOT NULL,
  `colonia` varchar(30) NOT NULL,
  `cp` varchar(10) NOT NULL,
  `municipio` varchar(30) NOT NULL,
  `gradoEstudios` varchar(20) NOT NULL,
  `trabajo6meses` varchar(5) NOT NULL,
  `motivoNoTrabajo` varchar(50) NOT NULL,
  `seguroMedico` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `requisitosadicionales`
--

CREATE TABLE `requisitosadicionales` (
  `idRequisitosAdicionales` int(11) NOT NULL,
  `escuelaDentroMunicipio` varchar(5) NOT NULL,
  `tiempoTranslado` varchar(10) NOT NULL,
  `tipoTransporte` varchar(20) NOT NULL,
  `tipoTechoCasa` varchar(20) NOT NULL,
  `aguaEnCasa` varchar(20) NOT NULL,
  `tipoMaterialPisoCasa` varchar(20) NOT NULL,
  `energiaElectrica` varchar(5) NOT NULL,
  `tipoMaterialMurosCasa` varchar(20) NOT NULL,
  `recibeOtroApoyo` varchar(5) NOT NULL,
  `tipoApoyo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `idServicios` int(11) NOT NULL,
  `callesPavimentadas` varchar(5) NOT NULL,
  `drenaje` varchar(5) NOT NULL,
  `biblioteca` varchar(5) NOT NULL,
  `recoleccionBasura` varchar(5) NOT NULL,
  `alumbradoPublico` varchar(5) NOT NULL,
  `telefonoPublico` varchar(5) NOT NULL,
  `transportePublico` varchar(5) NOT NULL,
  `aguaPotable` varchar(5) NOT NULL,
  `juegosOCanchas` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes`
--

CREATE TABLE `solicitudes` (
  `idSolicitud` int(11) NOT NULL,
  `idAlumno` int(11) NOT NULL,
  `idEscuela` int(11) NOT NULL,
  `idPadre` int(11) DEFAULT NULL,
  `idIngresosFamiliares` int(11) DEFAULT NULL,
  `idServicios` int(11) DEFAULT NULL,
  `idRequisitosAdicionales` int(11) DEFAULT NULL,
  `nivelEstudios` varchar(20) DEFAULT NULL,
  `promedioReciente` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuarios` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(33) NOT NULL,
  `tipoCuenta` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuarios`, `username`, `password`, `tipoCuenta`) VALUES
(1, 'EdwinMLara', 'iHXAt3Q=', 'administrador');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`idAlumno`),
  ADD UNIQUE KEY `curp` (`curp`);

--
-- Indices de la tabla `escuela`
--
ALTER TABLE `escuela`
  ADD PRIMARY KEY (`idEscuela`);

--
-- Indices de la tabla `ingresosfamiliares`
--
ALTER TABLE `ingresosfamiliares`
  ADD PRIMARY KEY (`idIngresosFamiliares`);

--
-- Indices de la tabla `padre`
--
ALTER TABLE `padre`
  ADD PRIMARY KEY (`idPadre`);

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
  ADD KEY `FK_alumnos` (`idAlumno`);

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
  MODIFY `idAlumno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `escuela`
--
ALTER TABLE `escuela`
  MODIFY `idEscuela` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `ingresosfamiliares`
--
ALTER TABLE `ingresosfamiliares`
  MODIFY `idIngresosFamiliares` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `padre`
--
ALTER TABLE `padre`
  MODIFY `idPadre` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `requisitosadicionales`
--
ALTER TABLE `requisitosadicionales`
  MODIFY `idRequisitosAdicionales` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `idServicios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  MODIFY `idSolicitud` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD CONSTRAINT `FK_alumnos` FOREIGN KEY (`idAlumno`) REFERENCES `alumnos` (`idAlumno`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
