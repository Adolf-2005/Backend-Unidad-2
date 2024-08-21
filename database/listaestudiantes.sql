-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-08-2024 a las 19:13:13
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `listaestudiantes`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listaestudiantes`
--

CREATE TABLE `listaestudiantes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(300) NOT NULL,
  `edad` varchar(20) NOT NULL,
  `carrera` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ucs2 COLLATE=ucs2_spanish2_ci;

--
-- Volcado de datos para la tabla `listaestudiantes`
--

INSERT INTO `listaestudiantes` (`id`, `nombre`, `edad`, `carrera`) VALUES
(1, 'Jorge Fernández', '20', 'Ingeniería Industrial'),
(2, 'María José ', '18', 'Ingeniería Industrial'),
(3, 'Cesar Sánchez ', '20', 'Derecho'),
(4, 'Fernando Fernández ', '19', 'Derecho'),
(5, 'Thiago Matías  ', '19', 'Contaduría'),
(6, 'Carla Martínez', '25', 'Contaduría');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `listaestudiantes`
--
ALTER TABLE `listaestudiantes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `listaestudiantes`
--
ALTER TABLE `listaestudiantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
