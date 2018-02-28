-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Φιλοξενητής: 127.0.0.1
-- Χρόνος δημιουργίας: 28 Φεβ 2018 στις 22:23:25
-- Έκδοση διακομιστή: 10.1.26-MariaDB
-- Έκδοση PHP: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Βάση δεδομένων: `candyland`
--

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `telephone` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Άδειασμα δεδομένων του πίνακα `admin`
--

INSERT INTO `admin` (`admin_id`, `username`, `password`, `first_name`, `last_name`, `email`, `telephone`) VALUES
(1, 'jezulas', '12345678', 'christos', 'stylianidis', 'thearchnoob@gmail.com', '2100000000'),
(2, 'tsikos', '12345678', 'konstantinos', 'mitropoulos', 'konsmitr@gmail.com', '2101111111'),
(3, 'pipo', '12345678', 'philipos', 'orfanoudakis', 'phil.orfa@gmail.com', '2102222222');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `event_event_id` bigint(20) NOT NULL,
  `Parent_parent_id` int(11) NOT NULL,
  `ticket_number` int(11) NOT NULL,
  `total_cost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Άδειασμα δεδομένων του πίνακα `booking`
--

INSERT INTO `booking` (`booking_id`, `event_event_id`, `Parent_parent_id`, `ticket_number`, `total_cost`) VALUES
(1, 1, 1, 2, 16),
(2, 2, 2, 2, 10);

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `event`
--

CREATE TABLE `event` (
  `event_id` bigint(20) NOT NULL,
  `provider_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `date` date NOT NULL,
  `time` time(6) NOT NULL,
  `tickets_available` int(11) NOT NULL,
  `cost` decimal(10,0) NOT NULL,
  `description` text NOT NULL,
  `tickets_sold` int(11) NOT NULL,
  `category` varchar(45) NOT NULL,
  `min_age` int(2) NOT NULL,
  `max_age` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Άδειασμα δεδομένων του πίνακα `event`
--

INSERT INTO `event` (`event_id`, `provider_id`, `name`, `address`, `date`, `time`, `tickets_available`, `cost`, `description`, `tickets_sold`, `category`, `min_age`, `max_age`) VALUES
(1, 1, 'bird watching', 'argonafton 25', '2018-03-02', '08:00:00.000000', 20, '8', 'Lots of birds, come see! There will be penguins too.', 5, 'outdoors', 10, 18),
(2, 1, '5v5 football match', 'grigoriou kousidi 23', '2018-03-03', '10:00:00.000000', 8, '5', 'Just another match.', 2, 'sports', 12, 14);

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `parent`
--

CREATE TABLE `parent` (
  `parent_id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `postal_code` int(5) NOT NULL,
  `telephone` varchar(15) NOT NULL,
  `email` varchar(45) NOT NULL,
  `points` int(11) NOT NULL,
  `bank_account` bigint(16) NOT NULL,
  `number_of_purchases` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Άδειασμα δεδομένων του πίνακα `parent`
--

INSERT INTO `parent` (`parent_id`, `username`, `password`, `first_name`, `last_name`, `address`, `postal_code`, `telephone`, `email`, `points`, `bank_account`, `number_of_purchases`) VALUES
(1, 'mpakso', '12345678', 'george', 'mpaksopoulos', 'mikinon 20', 16674, '2103333333', 'baxopoulos.george@gmail.com', 15, 1111111111111111, 5),
(2, 'santa', '12345678', 'klaus', 'sinani', 'argonafton 3', 17563, '2104444444', 'sinaniklaudio@gmail.com', 103, 2222222222222222, 3);

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `provider`
--

CREATE TABLE `provider` (
  `provider_id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `company_name` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `postal_code` int(5) NOT NULL,
  `telephone` varchar(15) NOT NULL,
  `email` varchar(45) NOT NULL,
  `afm` int(9) NOT NULL,
  `bank_account` bigint(16) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Άδειασμα δεδομένων του πίνακα `provider`
--

INSERT INTO `provider` (`provider_id`, `username`, `password`, `first_name`, `last_name`, `company_name`, `address`, `postal_code`, `telephone`, `email`, `afm`, `bank_account`, `description`) VALUES
(1, 'loniasgr', '12345678', 'leonidas', 'avdelas', 'lonias enterprise', 'metron 12', 17123, '2105555555', 'avdelasleonidas@gmail.com', 0, 1111111111111112, 'Great provider, great products, lots of money, please invest!');

--
-- Ευρετήρια για άχρηστους πίνακες
--

--
-- Ευρετήρια για πίνακα `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Ευρετήρια για πίνακα `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `fk_booking_event1_idx` (`event_event_id`),
  ADD KEY `fk_booking_Parent1_idx` (`Parent_parent_id`);

--
-- Ευρετήρια για πίνακα `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `fk_event_Provider` (`provider_id`);

--
-- Ευρετήρια για πίνακα `parent`
--
ALTER TABLE `parent`
  ADD PRIMARY KEY (`parent_id`);

--
-- Ευρετήρια για πίνακα `provider`
--
ALTER TABLE `provider`
  ADD PRIMARY KEY (`provider_id`);

--
-- AUTO_INCREMENT για άχρηστους πίνακες
--

--
-- AUTO_INCREMENT για πίνακα `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT για πίνακα `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT για πίνακα `event`
--
ALTER TABLE `event`
  MODIFY `event_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT για πίνακα `parent`
--
ALTER TABLE `parent`
  MODIFY `parent_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT για πίνακα `provider`
--
ALTER TABLE `provider`
  MODIFY `provider_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Περιορισμοί για άχρηστους πίνακες
--

--
-- Περιορισμοί για πίνακα `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `fk_booking_Parent1` FOREIGN KEY (`Parent_parent_id`) REFERENCES `parent` (`parent_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_booking_event1` FOREIGN KEY (`event_event_id`) REFERENCES `event` (`event_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Περιορισμοί για πίνακα `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `fk_event_Provider` FOREIGN KEY (`provider_id`) REFERENCES `provider` (`provider_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
