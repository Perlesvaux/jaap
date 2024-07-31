--
-- PostgreSQL database dump
--

-- Dumped from database version 14.12 (Ubuntu 14.12-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.12 (Ubuntu 14.12-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE jaap;
--
-- Name: jaap; Type: DATABASE; Schema: -; Owner: chico
--

CREATE DATABASE jaap WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';


ALTER DATABASE jaap OWNER TO chico;

\connect jaap

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: recibos; Type: TABLE; Schema: public; Owner: chico
--

CREATE TABLE public.recibos (
    medidor integer,
    lectura_actual integer,
    lectura_anterior integer,
    consumo integer,
    desde date,
    hasta date,
    dias integer,
    numero integer
);


ALTER TABLE public.recibos OWNER TO chico;

--
-- Name: r_n_seq; Type: SEQUENCE; Schema: public; Owner: chico
--

CREATE SEQUENCE public.r_n_seq
    START WITH 99894
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.r_n_seq OWNER TO chico;

--
-- Name: r_n_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chico
--

ALTER SEQUENCE public.r_n_seq OWNED BY public.recibos.numero;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: chico
--

CREATE TABLE public.usuarios (
    medidor integer NOT NULL,
    nombre character varying(60),
    caserio character varying(60),
    zona integer
);


ALTER TABLE public.usuarios OWNER TO chico;

--
-- Name: recibos numero; Type: DEFAULT; Schema: public; Owner: chico
--

ALTER TABLE ONLY public.recibos ALTER COLUMN numero SET DEFAULT nextval('public.r_n_seq'::regclass);


--
-- Data for Name: recibos; Type: TABLE DATA; Schema: public; Owner: chico
--

INSERT INTO public.recibos VALUES (503, 263, 255, 8, '2023-10-15', '2023-11-15', 31, 99891);
INSERT INTO public.recibos VALUES (520, 260, 255, 5, '2023-10-15', '2023-11-15', 31, 99892);
INSERT INTO public.recibos VALUES (503, 270, 261, 9, '2023-11-15', '2023-12-15', 31, 99893);
INSERT INTO public.recibos VALUES (520, 265, 260, 5, '2023-11-15', '2023-12-15', 30, 99894);


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: chico
--

INSERT INTO public.usuarios VALUES (503, 'Manuel', 'La Pradera', 9);
INSERT INTO public.usuarios VALUES (520, 'Josh', 'La Providencia', 11);


--
-- Name: r_n_seq; Type: SEQUENCE SET; Schema: public; Owner: chico
--

SELECT pg_catalog.setval('public.r_n_seq', 99894, true);


--
-- Name: usuarios usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: chico
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (medidor);


--
-- Name: recibos recibo_medidor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chico
--

ALTER TABLE ONLY public.recibos
    ADD CONSTRAINT recibo_medidor_fkey FOREIGN KEY (medidor) REFERENCES public.usuarios(medidor);


--
-- PostgreSQL database dump complete
--

