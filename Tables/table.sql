-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema booking
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `booking` ;

-- -----------------------------------------------------
-- Schema booking
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `booking` DEFAULT CHARACTER SET utf8 ;
USE `booking` ;

-- -----------------------------------------------------
-- Table `booking`.`movie`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `booking`.`movie` ;

CREATE TABLE IF NOT EXISTS `booking`.`movie` (
  `mid` INT(11) NOT NULL AUTO_INCREMENT,
  `mname` VARCHAR(45) NULL DEFAULT NULL,
  `mcover` VARCHAR(100) NULL DEFAULT NULL,
  `des` VARCHAR(700) NULL DEFAULT NULL,
  PRIMARY KEY (`mid`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `booking`.`th`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `booking`.`th` ;

CREATE TABLE IF NOT EXISTS `booking`.`th` (
  `tid` INT(11) NOT NULL AUTO_INCREMENT,
  `tname` VARCHAR(45) NULL DEFAULT NULL,
  `tcity` VARCHAR(45) NULL DEFAULT NULL,
  `tcover` VARCHAR(45) NULL DEFAULT NULL,
  `mid` INT(11) NOT NULL,
  PRIMARY KEY (`tid`, `mid`),
  INDEX `fk_th_movie1_idx` (`mid` ASC) VISIBLE,
  CONSTRAINT `fk_th_movie1`
    FOREIGN KEY (`mid`)
    REFERENCES `booking`.`movie` (`mid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `booking`.`seats`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `booking`.`seats` ;

CREATE TABLE IF NOT EXISTS `booking`.`seats` (
  `seats` VARCHAR(110) NOT NULL,
  `tid` INT(11) NOT NULL,
  `sid` INT(100) NOT NULL,
  PRIMARY KEY (`tid`, `sid`),
  INDEX `fk_seats_th1_idx` (`tid` ASC) VISIBLE,
  CONSTRAINT `fk_seats_th1`
    FOREIGN KEY (`tid`)
    REFERENCES `booking`.`th` (`tid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `booking`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `booking`.`user` ;

CREATE TABLE IF NOT EXISTS `booking`.`user` (
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(32) NOT NULL,
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 12346
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `booking`.`booking`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `booking`.`booking` ;

CREATE TABLE IF NOT EXISTS `booking`.`booking` (
  `book_id` INT NOT NULL AUTO_INCREMENT,
  `tid` INT(11) NOT NULL,
  `sid` INT(100) NOT NULL,
  `uid` INT(11) NOT NULL,
  `mid` INT(11) NOT NULL,
  PRIMARY KEY (`book_id`, `tid`, `sid`, `uid`, `mid`),
  INDEX `fk_booking_seats1_idx` (`tid` ASC, `sid` ASC) VISIBLE,
  INDEX `fk_booking_user1_idx` (`uid` ASC) VISIBLE,
  INDEX `fk_booking_movie1_idx` (`mid` ASC) VISIBLE,
  CONSTRAINT `fk_booking_seats1`
    FOREIGN KEY (`tid` , `sid`)
    REFERENCES `booking`.`seats` (`tid` , `sid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_booking_user1`
    FOREIGN KEY (`uid`)
    REFERENCES `booking`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_booking_movie1`
    FOREIGN KEY (`mid`)
    REFERENCES `booking`.`movie` (`mid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
