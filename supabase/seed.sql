SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.5 (Ubuntu 15.5-1.pgdg20.04+1)

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


--
-- Data for Name: folders; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."folders" ("id", "folder_name", "parent_folder_id", "created_by", "created_at") OVERRIDING SYSTEM VALUE VALUES
	(1, 'Property', NULL, 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', '2024-01-10 12:15:11.918691+00'),
	(2, 'Litigation', NULL, 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', '2024-01-10 15:01:54.289298+00'),
	(3, 'Contracts', 1, 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', '2024-01-10 15:02:52.143668+00'),
	(5, 'Deeds', 1, 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', '2024-01-10 15:03:52.143668+00'),
	(4, 'Debt Collection', 2, 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', '2024-01-11 14:11:23.895585+00');
