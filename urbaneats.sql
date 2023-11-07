-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
<<<<<<< HEAD
-- Tiempo de generación: 08-11-2023 a las 00:21:18
=======
-- Tiempo de generación: 26-10-2023 a las 03:35:45
>>>>>>> 5ea5eace4b2625ace6b02197fa71b5e0595b04a8
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
-- Base de datos: `urbaneats_prueba`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'plato principal'),
(2, 'desayuno'),
(3, 'postre'),
(4, 'bebidas'),
(5, 'combo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `product_id`) VALUES
(2, 5, 0),
(3, 1, 0),
(4, 5, 0),
(5, 3, 0),
(6, 2, 0),
(7, 1, 0),
(8, 10, 0),
(9, 1, 0),
(10, 5, 0),
(11, 4, 0),
(12, 2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(500) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`, `category_id`, `created_at`, `updated_at`) VALUES
<<<<<<< HEAD
(1, 'Humita', 'loren', 2000.00, 'humitas.jpg', 3, '2023-10-24 19:07:19', '2023-11-05 15:42:45'),
(2, 'Empanadas de pollo', 'lorem ipsum', 2000.00, 'empanadas.jpg', 3, '2023-10-24 19:11:55', '2023-11-05 15:43:31'),
(3, 'Locro', 'lorem ipsum', 2000.00, 'locro.jpg', 1, '2023-10-24 19:13:08', '2023-11-05 15:44:17'),
(4, 'Tamales', 'lorem ipsum', 2000.00, 'tamales.jpg', 3, '2023-10-24 19:16:30', '2023-11-05 15:44:51'),
(5, 'Carne de llama', 'lorem ipsum', 2000.00, 'carne-llama.jpg', 1, '2023-10-24 19:16:30', '2023-11-05 15:45:13'),
(6, 'Guiso de lentejas', 'lorem ipsum', 2000.00, 'guiso-lentejas.jpg', 1, '2023-10-24 19:16:30', '2023-11-05 15:45:43'),
(7, 'Zapallito relleno', 'lorem ipsum', 2000.00, 'zapallito-relleno.jpg', 1, '2023-10-24 19:16:30', '2023-11-05 15:46:47'),
(19, 'Polenta', 'lorem ipsum', 1500.00, 'image-1699198038929.jpg', NULL, '2023-11-05 15:27:18', '2023-11-05 15:27:18');
=======
(1, 'sopa majada', 'loren', 2000.00, 'humitas.png', 3, '2023-10-24 19:07:19', '2023-10-24 19:07:19'),
(2, 'empanadas de pollo', 'lorem ipsum', 2000.00, 'locro.jpg', 3, '2023-10-24 19:11:55', '2023-10-24 19:11:55'),
(3, 'locro', 'lorem ipsum', 2000.00, 'locro.jpg', 1, '2023-10-24 19:13:08', '2023-10-24 19:13:08'),
(4, 'tamales', 'lorem ipsum', 2000.00, 'locro.jpg', 3, '2023-10-24 19:16:30', '2023-10-24 19:16:30'),
(5, 'carne de llama', 'lorem ipsum', 2000.00, 'carne-llama.jpg', 1, '2023-10-24 19:16:30', '2023-10-24 19:16:30'),
(6, 'guiso de lentajas', 'lorem ipsum', 2000.00, 'guiso-lentejas.jpg', 1, '2023-10-24 19:16:30', '2023-10-24 19:16:30'),
(7, 'zapallito relleno', 'lorem ipsum', 2000.00, 'plato-rincipal.jpg', 1, '2023-10-24 19:16:30', '2023-10-24 19:16:30');
>>>>>>> 5ea5eace4b2625ace6b02197fa71b5e0595b04a8

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_order`
--

CREATE TABLE `product_order` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `product_order`
--

INSERT INTO `product_order` (`id`, `order_id`, `product_id`, `quantity`, `total`) VALUES
(1, 9, 9, 8, NULL),
(2, 5, 5, 1, NULL),
(3, 10, 9, 3, NULL),
(4, 9, 10, 8, NULL),
(5, 2, 10, 1, NULL),
(6, 2, 10, 7, NULL),
(7, 2, 5, 3, NULL),
(8, 10, 3, 3, NULL),
(9, 2, 8, 6, NULL),
(10, 6, 7, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) NOT NULL,
  `hashed_password` varchar(100) NOT NULL,
  `salt` varchar(50) NOT NULL,
  `profile_image` varchar(50) DEFAULT NULL,
  `order_id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `hashed_password`, `salt`, `profile_image`, `order_id`, `email`) VALUES
(1, 'Arturo', 'Petrou', '$2a$04$1uTgIJZJLUUg/cEAT.8Kju.0AYPc/S4K.hj9wYcNyy.BUzSTcFhua', '10', 'http://dummyimage.com/128x100.png/5fa2dd/ffffff', 4, 'apetrou0@1und1.de'),
(2, 'Gay', 'Gamble', '$2a$04$kmjFB1Jc1PIJPjGaBvFnxObodsRy5evqgzR03b9tSvkbtlQaf4NN6', '10', 'http://dummyimage.com/167x100.png/dddddd/000000', 4, 'ggamble1@unblog.fr'),
(3, 'Jaimie', 'Beadel', '$2a$04$OqOSo1OExEMNEPq58av3sOKydIgMDY7Wkl8USeSa42FKCND//Eyk2', '10', 'http://dummyimage.com/133x100.png/dddddd/000000', 10, 'jbeadel2@spiegel.de'),
(4, 'Mignonne', 'Yates', '$2a$04$.26NLRNQw9VerE9ybgLjmeYD32iXCMleMjXMc5K/iJmITprRJ6ZEK', '10', 'http://dummyimage.com/188x100.png/5fa2dd/ffffff', 5, 'myates3@pbs.org'),
(5, 'Whitney', 'Nelthorpe', '$2a$04$HnZmnnO.T76FAK5l8eGeKehtWhX9QTmZfzNO0RbFiA8IxxXH1AUdW', '10', 'http://dummyimage.com/187x100.png/dddddd/000000', 9, 'wnelthorpe4@infoseek.co.jp'),
(6, 'Winston', 'Chipps', '$2a$04$qB91dg.mD0e/r2ML9ibzSekpal53aOvvHp4LjuoJ3ZdV72akNo6TG', '10', 'http://dummyimage.com/131x100.png/cc0000/ffffff', 6, 'wchipps5@themeforest.net'),
(7, 'Jourdain', 'Stoddart', '$2a$04$qDhO9Zeg8r.9jozQllt9yOK39dlRF.ZY9XBNylXVRT58ncUfJV3he', '10', 'http://dummyimage.com/185x100.png/dddddd/000000', 9, 'jstoddart6@flavors.me'),
(8, 'Roda', 'Cudde', '$2a$04$NEcZfQyvTGZl55xbCxUnROE33CQqgvpcXQFafHCxIxq66hXQ3IqHy', '10', 'http://dummyimage.com/133x100.png/cc0000/ffffff', 2, 'rcudde7@google.co.jp'),
(9, 'Guido', 'Shippard', '$2a$04$POWCSQctF.MDyr1xcY3JT.5PAE/BDl3pLIQmRIsBm7oyIQQkgam3a', '10', 'http://dummyimage.com/210x100.png/dddddd/000000', 8, 'gshippard8@youku.com'),
(10, 'Sileas', 'Pryor', '$2a$04$jEfpXl9IvQMfpg9ezxD3dOwzpH2FphNuSyyWApdovSoL96Zjj0rJi', '10', 'http://dummyimage.com/139x100.png/dddddd/000000', 5, 'spryor9@dot.gov');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indices de la tabla `product_order`
--
ALTER TABLE `product_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
<<<<<<< HEAD
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
=======
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
>>>>>>> 5ea5eace4b2625ace6b02197fa71b5e0595b04a8

--
-- AUTO_INCREMENT de la tabla `product_order`
--
ALTER TABLE `product_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
