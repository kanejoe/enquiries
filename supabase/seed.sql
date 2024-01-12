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
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '0b9efbdf-51e4-46e2-983a-e2669f9c24fd', '{"action":"user_signedup","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2024-01-10 12:01:50.56641+00', ''),
	('00000000-0000-0000-0000-000000000000', '36af2669-7e9a-401a-a8d3-e318e8df1f4e', '{"action":"login","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-01-10 12:01:50.60928+00', ''),
	('00000000-0000-0000-0000-000000000000', '3c8a3706-615f-49c1-8f91-4aabd76008fa', '{"action":"token_refreshed","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-10 13:00:23.852545+00', ''),
	('00000000-0000-0000-0000-000000000000', '0b4ee1c0-8df3-4fee-af5d-ed64e2e620f8', '{"action":"token_revoked","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-10 13:00:23.857507+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b5f53074-ae40-46fb-9e45-782b45684bdc', '{"action":"token_refreshed","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-10 13:59:49.782906+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd806d23f-a8ac-4df5-8038-3dce1f205078', '{"action":"token_revoked","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-10 13:59:49.785282+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fb35ef9a-09e0-4aa4-a264-08e11fd7e2a1', '{"action":"token_refreshed","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-10 15:01:26.786785+00', ''),
	('00000000-0000-0000-0000-000000000000', '1f212309-1daf-4bbd-86a1-86fccaae39de', '{"action":"token_revoked","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-10 15:01:26.794026+00', ''),
	('00000000-0000-0000-0000-000000000000', '9c606450-c384-431b-9330-8ffffd26ac7a', '{"action":"token_refreshed","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-10 15:59:28.754965+00', ''),
	('00000000-0000-0000-0000-000000000000', '4e6ff3fb-ed38-4e9d-ab74-68ac06a187e9', '{"action":"token_revoked","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-10 15:59:28.75979+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c1e851d5-b79c-4aad-860d-2b06445f52ea', '{"action":"token_refreshed","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-10 17:13:07.404998+00', ''),
	('00000000-0000-0000-0000-000000000000', '398669af-7504-45a4-b2ce-44ad55ef118e', '{"action":"token_revoked","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-10 17:13:07.409352+00', ''),
	('00000000-0000-0000-0000-000000000000', '30ad22f4-fe42-4b23-9d15-d7ea7fd4fc22', '{"action":"token_refreshed","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-10 17:13:07.48675+00', ''),
	('00000000-0000-0000-0000-000000000000', '54b2a5ff-2de8-43a8-a610-378523ab8e8b', '{"action":"token_refreshed","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-10 21:58:40.156228+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ae1b19b7-ad00-4440-8f0a-bebca1b60f07', '{"action":"token_revoked","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-10 21:58:40.161215+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ba3f2706-04d8-48c3-8cf3-919fa88af7be', '{"action":"token_refreshed","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-11 09:06:02.83294+00', ''),
	('00000000-0000-0000-0000-000000000000', '60a29f62-a1e5-443e-ab96-fae64ec1a45a', '{"action":"token_revoked","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-11 09:06:02.837789+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dfd175da-b93e-483e-a3a6-970de15901de', '{"action":"token_refreshed","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-11 10:04:30.474137+00', ''),
	('00000000-0000-0000-0000-000000000000', 'da0d7efd-fcff-4fc8-81c8-b71fb3096bf4', '{"action":"token_revoked","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-11 10:04:30.477471+00', ''),
	('00000000-0000-0000-0000-000000000000', '186ce38c-7544-45a9-8f97-e8b47be92bc7', '{"action":"token_refreshed","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-11 11:52:10.106493+00', ''),
	('00000000-0000-0000-0000-000000000000', '00a8cce8-34ad-4b7f-991d-89b8e2fca078', '{"action":"token_revoked","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-11 11:52:10.11199+00', ''),
	('00000000-0000-0000-0000-000000000000', '5b8dde14-8af5-4c2c-9802-09f19c42865a', '{"action":"token_refreshed","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-11 12:52:06.202517+00', ''),
	('00000000-0000-0000-0000-000000000000', '1fb24a7e-a0d7-488b-abcb-651ef8d054b7', '{"action":"token_revoked","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-11 12:52:06.206913+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e9288c48-b0ab-4cf7-8eaf-8c54d3721990', '{"action":"token_refreshed","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-11 13:51:24.806159+00', ''),
	('00000000-0000-0000-0000-000000000000', '88ae8cbb-b10b-470d-a77c-84d9c7a765aa', '{"action":"token_revoked","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-11 13:51:24.838596+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bc94f7bd-99fd-4156-9df8-994d6d8d3803', '{"action":"token_refreshed","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-11 14:49:31.591226+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e12847bb-c2b0-4e90-b964-c9af1a0b33f2', '{"action":"token_revoked","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-11 14:49:31.596897+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e81053e8-4fae-427e-b4e4-51e328b1aa13', '{"action":"token_refreshed","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-11 15:50:50.911415+00', ''),
	('00000000-0000-0000-0000-000000000000', '973d69b5-84ff-4b3e-ad7e-a4247a8dd540', '{"action":"token_revoked","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-11 15:50:50.91317+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a2594b46-1f44-4283-949c-461fa73a0faa', '{"action":"token_refreshed","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-11 16:49:16.170608+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f92290a5-ccf9-40dc-a2ea-c17fcf1e79d6', '{"action":"token_revoked","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-11 16:49:16.17713+00', ''),
	('00000000-0000-0000-0000-000000000000', '4d2e9365-e3e8-4a55-becb-c35f376fbdc8', '{"action":"token_refreshed","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-11 17:47:34.440978+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c3a53752-95d1-44e1-8e38-a2e568467420', '{"action":"token_revoked","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-11 17:47:34.446678+00', ''),
	('00000000-0000-0000-0000-000000000000', '71134a5c-187a-445c-8843-6098fd1e402c', '{"action":"token_refreshed","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-11 18:45:37.203281+00', ''),
	('00000000-0000-0000-0000-000000000000', '0be2b461-b032-46c9-acb2-b9259f9c7159', '{"action":"token_revoked","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-11 18:45:37.210199+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ee833854-6325-4314-99cb-700ce5993465', '{"action":"token_refreshed","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-11 21:01:13.968033+00', ''),
	('00000000-0000-0000-0000-000000000000', '4288a7fd-b882-4bbb-904b-a40ce2546416', '{"action":"token_revoked","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-11 21:01:13.970775+00', ''),
	('00000000-0000-0000-0000-000000000000', '8b347fb8-0259-4322-9982-f2538099870a', '{"action":"token_refreshed","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-12 09:31:09.7802+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a2c0a42a-36be-4eac-896e-7badbf064f72', '{"action":"token_revoked","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-12 09:31:09.783826+00', ''),
	('00000000-0000-0000-0000-000000000000', '9006ab49-c13d-4e69-b09c-60783a4d0988', '{"action":"token_refreshed","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-12 09:31:10.499546+00', ''),
	('00000000-0000-0000-0000-000000000000', '14b14f83-83b8-4471-acd2-e357695840cb', '{"action":"token_refreshed","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-12 11:17:44.232826+00', ''),
	('00000000-0000-0000-0000-000000000000', '2389c244-8f95-414b-b831-42346e9f65b8', '{"action":"token_revoked","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-12 11:17:44.238148+00', ''),
	('00000000-0000-0000-0000-000000000000', '55e093f9-bdfb-4789-aa9e-b994b2c99794', '{"action":"token_refreshed","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-12 13:24:42.555363+00', ''),
	('00000000-0000-0000-0000-000000000000', '01821545-5c9b-47b5-b8c5-c3ed419db886', '{"action":"token_revoked","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-12 13:24:42.560326+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a5068ffb-c33d-4b6c-b3ce-a5ee3a331f3b', '{"action":"token_refreshed","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-12 14:39:27.688928+00', ''),
	('00000000-0000-0000-0000-000000000000', '5c6381aa-581d-4fb6-8659-b12ecc255f75', '{"action":"token_revoked","actor_id":"a1e9e1a7-1e69-4b89-a05e-b492f9a91666","actor_username":"joe@jkco.ie","actor_via_sso":false,"log_type":"token"}', '2024-01-12 14:39:27.691397+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at") VALUES
	('00000000-0000-0000-0000-000000000000', 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', 'authenticated', 'authenticated', 'joe@jkco.ie', '$2a$10$LEejvh5lqjP2ypY0TsKR8uUAGL9WW4mMKCCTnqD5dZCZpx2fHY3ly', '2024-01-10 12:01:50.570181+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-01-10 12:01:50.612341+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-01-10 12:01:50.540619+00', '2024-01-12 14:39:27.704034+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('a1e9e1a7-1e69-4b89-a05e-b492f9a91666', 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', '{"sub": "a1e9e1a7-1e69-4b89-a05e-b492f9a91666", "email": "joe@jkco.ie", "email_verified": false, "phone_verified": false}', 'email', '2024-01-10 12:01:50.562828+00', '2024-01-10 12:01:50.562882+00', '2024-01-10 12:01:50.562882+00', '024fb657-9ed1-409e-bfce-aeb84899c499');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('cfd96ddf-a612-4a38-b1a5-d0139fb3f0b8', 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', '2024-01-10 12:01:50.612803+00', '2024-01-12 14:39:27.707537+00', NULL, 'aal1', NULL, '2024-01-12 14:39:27.706429', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', '172.18.0.1', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('cfd96ddf-a612-4a38-b1a5-d0139fb3f0b8', '2024-01-10 12:01:50.630449+00', '2024-01-10 12:01:50.630449+00', 'password', '91175ffb-ecce-4351-b741-ca50bf8eb2fb');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 1, '_YFSX9_W4nY-_EpcLSAlQQ', 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', true, '2024-01-10 12:01:50.619082+00', '2024-01-10 13:00:23.859163+00', NULL, 'cfd96ddf-a612-4a38-b1a5-d0139fb3f0b8'),
	('00000000-0000-0000-0000-000000000000', 2, 'MmrbRTBTK5_1Jo-A5e5mNQ', 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', true, '2024-01-10 13:00:23.866809+00', '2024-01-10 13:59:49.786404+00', '_YFSX9_W4nY-_EpcLSAlQQ', 'cfd96ddf-a612-4a38-b1a5-d0139fb3f0b8'),
	('00000000-0000-0000-0000-000000000000', 3, 'ExL3U1wu7CZmFsBzUt4VTw', 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', true, '2024-01-10 13:59:49.789742+00', '2024-01-10 15:01:26.795722+00', 'MmrbRTBTK5_1Jo-A5e5mNQ', 'cfd96ddf-a612-4a38-b1a5-d0139fb3f0b8'),
	('00000000-0000-0000-0000-000000000000', 4, '5vlbLzNFr1EMA1bb12wBCA', 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', true, '2024-01-10 15:01:26.799727+00', '2024-01-10 15:59:28.761091+00', 'ExL3U1wu7CZmFsBzUt4VTw', 'cfd96ddf-a612-4a38-b1a5-d0139fb3f0b8'),
	('00000000-0000-0000-0000-000000000000', 5, 'PAMQ5SqUx6EYF10YoMJB-Q', 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', true, '2024-01-10 15:59:28.763942+00', '2024-01-10 17:13:07.410413+00', '5vlbLzNFr1EMA1bb12wBCA', 'cfd96ddf-a612-4a38-b1a5-d0139fb3f0b8'),
	('00000000-0000-0000-0000-000000000000', 6, 'Km5h4Fm-bUDWsLEO5w3upQ', 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', true, '2024-01-10 17:13:07.413119+00', '2024-01-10 21:58:40.162605+00', 'PAMQ5SqUx6EYF10YoMJB-Q', 'cfd96ddf-a612-4a38-b1a5-d0139fb3f0b8'),
	('00000000-0000-0000-0000-000000000000', 7, '8eGPOJ8CX6mkXBD7cgP55A', 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', true, '2024-01-10 21:58:40.170171+00', '2024-01-11 09:06:02.839165+00', 'Km5h4Fm-bUDWsLEO5w3upQ', 'cfd96ddf-a612-4a38-b1a5-d0139fb3f0b8'),
	('00000000-0000-0000-0000-000000000000', 8, 'n8CsaxtK37uzd2SfxJ6RuA', 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', true, '2024-01-11 09:06:02.845541+00', '2024-01-11 10:04:30.478531+00', '8eGPOJ8CX6mkXBD7cgP55A', 'cfd96ddf-a612-4a38-b1a5-d0139fb3f0b8'),
	('00000000-0000-0000-0000-000000000000', 9, '5BTSyr2bSyCmgpja1VtsAw', 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', true, '2024-01-11 10:04:30.480519+00', '2024-01-11 11:52:10.113378+00', 'n8CsaxtK37uzd2SfxJ6RuA', 'cfd96ddf-a612-4a38-b1a5-d0139fb3f0b8'),
	('00000000-0000-0000-0000-000000000000', 10, 'HF8lH5HY11_ilOIB9TExCQ', 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', true, '2024-01-11 11:52:10.117017+00', '2024-01-11 12:52:06.208109+00', '5BTSyr2bSyCmgpja1VtsAw', 'cfd96ddf-a612-4a38-b1a5-d0139fb3f0b8'),
	('00000000-0000-0000-0000-000000000000', 11, 'N25cw7q1lXLcjivBKDsXZg', 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', true, '2024-01-11 12:52:06.212553+00', '2024-01-11 13:51:24.840313+00', 'HF8lH5HY11_ilOIB9TExCQ', 'cfd96ddf-a612-4a38-b1a5-d0139fb3f0b8'),
	('00000000-0000-0000-0000-000000000000', 12, 'qtIc1mdd2oaaEWM8ZWK0pg', 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', true, '2024-01-11 13:51:24.844581+00', '2024-01-11 14:49:31.598247+00', 'N25cw7q1lXLcjivBKDsXZg', 'cfd96ddf-a612-4a38-b1a5-d0139fb3f0b8'),
	('00000000-0000-0000-0000-000000000000', 13, 'RiVy9pJWgHPd73udUBff9g', 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', true, '2024-01-11 14:49:31.60285+00', '2024-01-11 15:50:50.914186+00', 'qtIc1mdd2oaaEWM8ZWK0pg', 'cfd96ddf-a612-4a38-b1a5-d0139fb3f0b8'),
	('00000000-0000-0000-0000-000000000000', 14, 'PNUWjolOgx4BPyAoM5abdA', 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', true, '2024-01-11 15:50:50.91542+00', '2024-01-11 16:49:16.178035+00', 'RiVy9pJWgHPd73udUBff9g', 'cfd96ddf-a612-4a38-b1a5-d0139fb3f0b8'),
	('00000000-0000-0000-0000-000000000000', 15, 'KsPT7CyEehuIfduz7TRJ5g', 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', true, '2024-01-11 16:49:16.181507+00', '2024-01-11 17:47:34.447904+00', 'PNUWjolOgx4BPyAoM5abdA', 'cfd96ddf-a612-4a38-b1a5-d0139fb3f0b8'),
	('00000000-0000-0000-0000-000000000000', 16, 'KP9lntuXksd4uAot2uY48w', 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', true, '2024-01-11 17:47:34.45095+00', '2024-01-11 18:45:37.212523+00', 'KsPT7CyEehuIfduz7TRJ5g', 'cfd96ddf-a612-4a38-b1a5-d0139fb3f0b8'),
	('00000000-0000-0000-0000-000000000000', 17, 'CcHIuGrQBJdvl1SM_Fr1PQ', 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', true, '2024-01-11 18:45:37.215467+00', '2024-01-11 21:01:13.972024+00', 'KP9lntuXksd4uAot2uY48w', 'cfd96ddf-a612-4a38-b1a5-d0139fb3f0b8'),
	('00000000-0000-0000-0000-000000000000', 18, 'OG4EK60qL_YCUZEFlIvXsw', 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', true, '2024-01-11 21:01:13.973979+00', '2024-01-12 09:31:09.78479+00', 'CcHIuGrQBJdvl1SM_Fr1PQ', 'cfd96ddf-a612-4a38-b1a5-d0139fb3f0b8'),
	('00000000-0000-0000-0000-000000000000', 19, 'm5fDEviai1g6z3oWn92UcQ', 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', true, '2024-01-12 09:31:09.788143+00', '2024-01-12 11:17:44.239431+00', 'OG4EK60qL_YCUZEFlIvXsw', 'cfd96ddf-a612-4a38-b1a5-d0139fb3f0b8'),
	('00000000-0000-0000-0000-000000000000', 20, 't8KNjY-Px31sZFcRtE44Yw', 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', true, '2024-01-12 11:17:44.24445+00', '2024-01-12 13:24:42.561282+00', 'm5fDEviai1g6z3oWn92UcQ', 'cfd96ddf-a612-4a38-b1a5-d0139fb3f0b8'),
	('00000000-0000-0000-0000-000000000000', 21, 'NeRe7YA3PPruF84rERG96g', 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', true, '2024-01-12 13:24:42.56508+00', '2024-01-12 14:39:27.692425+00', 't8KNjY-Px31sZFcRtE44Yw', 'cfd96ddf-a612-4a38-b1a5-d0139fb3f0b8'),
	('00000000-0000-0000-0000-000000000000', 22, 'TlejqklcVkEbKEKO2Jn1og', 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', false, '2024-01-12 14:39:27.701297+00', '2024-01-12 14:39:27.701297+00', 'NeRe7YA3PPruF84rERG96g', 'cfd96ddf-a612-4a38-b1a5-d0139fb3f0b8');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: folders; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."folders" ("id", "folder_name", "parent_folder_id", "created_by", "created_at") OVERRIDING SYSTEM VALUE VALUES
	(1, 'Property', NULL, 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', '2024-01-10 12:15:11.918691+00'),
	(2, 'Litigation', NULL, 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', '2024-01-10 15:01:54.289298+00'),
	(3, 'Contracts', 1, 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', '2024-01-10 15:02:52.143668+00'),
	(5, 'Deeds', 1, 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', '2024-01-10 15:03:52.143668+00'),
	(4, 'Debt Collection', 2, 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', '2024-01-11 14:11:23.895585+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") VALUES
	('files', 'files', NULL, '2024-01-10 11:59:29.331712+00', '2024-01-10 11:59:29.331712+00', false, false, NULL, NULL, NULL);


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: documents; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."documents" ("id", "name", "storage_object_id", "created_by", "created_at", "folder_id") OVERRIDING SYSTEM VALUE VALUES
	(17, '2023 Law Society Contract for Sale', NULL, 'a1e9e1a7-1e69-4b89-a05e-b492f9a91666', '2024-01-12 13:37:23.728155+00', 3);


--
-- Data for Name: document_sections; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: precedents; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profiles" ("id", "email", "first_name", "last_name", "initials") VALUES
	('a1e9e1a7-1e69-4b89-a05e-b492f9a91666', 'joe@jkco.ie', NULL, NULL, NULL);


--
-- Data for Name: properties; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: requisitions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: supabase_migrations; Owner: postgres
--

INSERT INTO "supabase_migrations"."schema_migrations" ("version", "statements", "name") VALUES
	('20230102100736', '{"create table \"public\".\"precedents\" (
    \"id\" bigint generated always as identity not null,
    \"name\" text not null,
    \"subname\" text not null,
    \"is_locked\" boolean not null default false,
    \"asset_id\" bigint,
    \"is_archived\" boolean default false,
    \"created_at\" date default now(),
    \"created_by\" text default ''''::text
)","create table \"public\".\"properties\" (
    \"id\" bigint generated by default as identity not null,
    \"created_at\" timestamp with time zone not null default now(),
    \"property\" text,
    \"eircode\" text,
    \"vendor\" text,
    \"category\" text,
    \"status\" text,
    \"is_archived\" boolean default false
)","create table \"public\".\"requisitions\" (
    \"id\" bigint generated always as identity not null,
    \"parent_id\" integer,
    \"sequence\" integer not null default 1,
    \"query\" text,
    \"reply\" text,
    \"is_applicable\" boolean not null default false,
    \"has_doc\" boolean not null default false,
    \"is_complete\" boolean not null default false,
    \"is_flagged\" boolean not null default false,
    \"is_required\" boolean not null default true,
    \"precedent_id\" bigint,
    \"is_locked\" boolean not null default false,
    \"is_archived\" boolean default false
)","CREATE UNIQUE INDEX precedents_pkey ON public.precedents USING btree (id)","CREATE UNIQUE INDEX properties_pkey ON public.properties USING btree (id)","CREATE UNIQUE INDEX requisitions_pkey ON public.requisitions USING btree (id)","alter table \"public\".\"precedents\" add constraint \"precedents_pkey\" PRIMARY KEY using index \"precedents_pkey\"","alter table \"public\".\"properties\" add constraint \"properties_pkey\" PRIMARY KEY using index \"properties_pkey\"","alter table \"public\".\"requisitions\" add constraint \"requisitions_pkey\" PRIMARY KEY using index \"requisitions_pkey\"","alter table \"public\".\"requisitions\" add constraint \"requisitions_parent_id_fkey\" FOREIGN KEY (parent_id) REFERENCES requisitions(id) not valid","alter table \"public\".\"requisitions\" validate constraint \"requisitions_parent_id_fkey\"","alter table \"public\".\"requisitions\" add constraint \"requisitions_precedent_id_fkey\" FOREIGN KEY (precedent_id) REFERENCES precedents(id) not valid","alter table \"public\".\"requisitions\" validate constraint \"requisitions_precedent_id_fkey\"","set check_function_bodies = off","CREATE OR REPLACE FUNCTION public.adjust_sequence(p_parent_id integer, p_new_sequence integer, p_old_sequence integer)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    
    -- Temporarily set the sequence of the moved item to a placeholder value (e.g., -1)
    UPDATE public.requisitions
    SET sequence = -1
    WHERE parent_id = p_parent_id AND sequence = p_old_sequence;

    -- Handle the case where the sequence is decreased
    IF p_new_sequence < p_old_sequence THEN
        UPDATE public.requisitions
        SET sequence = sequence + 1
        WHERE parent_id = p_parent_id AND sequence >= p_new_sequence AND sequence < p_old_sequence;
    END IF;

    -- Handle the case where the sequence is increased
    IF p_new_sequence > p_old_sequence THEN
        UPDATE public.requisitions
        SET sequence = sequence - 1
        WHERE parent_id = p_parent_id AND sequence <= p_new_sequence AND sequence > p_old_sequence;
    END IF;

    -- Finally, set the sequence of the moved item to the new value
    UPDATE public.requisitions
    SET sequence = p_new_sequence
    WHERE parent_id = p_parent_id AND sequence = -1;

END;
$function$","CREATE OR REPLACE FUNCTION public.inc_sequence(p_parent_id integer, p_sequence_threshold integer)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    UPDATE public.requisitions
    SET sequence = sequence + 1
    WHERE parent_id = p_parent_id AND sequence > p_sequence_threshold;
END;$function$","CREATE OR REPLACE FUNCTION public.insert_and_resequence(p_query text, p_parent_id integer, p_sequence integer)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    max_sequence INT;
BEGIN
    -- Check if a requisition with the provided sequence already exists
    IF EXISTS (SELECT 1 FROM requisitions WHERE parent_id = p_parent_id AND sequence = p_sequence) THEN

        -- Shift sequences of subsequent requisitions to make room for new one
        UPDATE requisitions
        SET sequence = sequence + 1
        WHERE parent_id = p_parent_id AND sequence >= p_sequence;

    END IF;

    -- Insert the new requisition
    INSERT INTO requisitions (query, parent_id, sequence) VALUES (p_query, p_parent_id, p_sequence);

END;
$function$","CREATE OR REPLACE FUNCTION public.update_requisition(p_id integer, p_parent_id integer, p_old_sequence integer, p_new_sequence integer, p_query text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Update the query first
    UPDATE public.requisitions
    SET query = p_query
    WHERE id = p_id;

    -- Temporarily set the sequence of the moved item to a placeholder value (e.g., -1)
    UPDATE public.requisitions
    SET sequence = -1
    WHERE id = p_id;

    -- Handle the case where the sequence is decreased
    IF p_new_sequence < p_old_sequence THEN
        UPDATE public.requisitions
        SET sequence = sequence + 1
        WHERE 
        (parent_id = p_parent_id OR (p_parent_id IS NULL AND parent_id IS NULL))
        AND sequence >= p_new_sequence AND sequence < p_old_sequence;
    END IF;

    -- Handle the case where the sequence is increased
    IF p_new_sequence > p_old_sequence THEN
        UPDATE public.requisitions
        SET sequence = sequence - 1
         WHERE 
        (parent_id = p_parent_id OR (p_parent_id IS NULL AND parent_id IS NULL))
        AND sequence <= p_new_sequence AND sequence > p_old_sequence;
    END IF;

    -- Finally, set the sequence of the moved item to the new value
    UPDATE public.requisitions
    SET sequence = p_new_sequence
    WHERE id = p_id;

END;
$function$","CREATE OR REPLACE FUNCTION public.update_requisition(p_id integer, p_parent_id integer, p_old_sequence integer, p_new_sequence integer, p_query text, p_is_required boolean)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Update the query first
    UPDATE public.requisitions
    SET query = p_query,
        is_required = p_is_required
    WHERE id = p_id;

    -- Temporarily set the sequence of the moved item to a placeholder value (e.g., -1)
    UPDATE public.requisitions
    SET sequence = -1
    WHERE id = p_id;

    -- Handle the case where the sequence is decreased
    IF p_new_sequence < p_old_sequence THEN
        UPDATE public.requisitions
        SET sequence = sequence + 1
        WHERE parent_id = p_parent_id AND sequence >= p_new_sequence AND sequence < p_old_sequence;
    END IF;

    -- Handle the case where the sequence is increased
    IF p_new_sequence > p_old_sequence THEN
        UPDATE public.requisitions
        SET sequence = sequence - 1
        WHERE parent_id = p_parent_id AND sequence <= p_new_sequence AND sequence > p_old_sequence;
    END IF;

    -- Finally, set the sequence of the moved item to the new value
    UPDATE public.requisitions
    SET sequence = p_new_sequence
    WHERE id = p_id;

END;
$function$","grant delete on table \"public\".\"precedents\" to \"anon\"","grant insert on table \"public\".\"precedents\" to \"anon\"","grant references on table \"public\".\"precedents\" to \"anon\"","grant select on table \"public\".\"precedents\" to \"anon\"","grant trigger on table \"public\".\"precedents\" to \"anon\"","grant truncate on table \"public\".\"precedents\" to \"anon\"","grant update on table \"public\".\"precedents\" to \"anon\"","grant delete on table \"public\".\"precedents\" to \"authenticated\"","grant insert on table \"public\".\"precedents\" to \"authenticated\"","grant references on table \"public\".\"precedents\" to \"authenticated\"","grant select on table \"public\".\"precedents\" to \"authenticated\"","grant trigger on table \"public\".\"precedents\" to \"authenticated\"","grant truncate on table \"public\".\"precedents\" to \"authenticated\"","grant update on table \"public\".\"precedents\" to \"authenticated\"","grant delete on table \"public\".\"precedents\" to \"service_role\"","grant insert on table \"public\".\"precedents\" to \"service_role\"","grant references on table \"public\".\"precedents\" to \"service_role\"","grant select on table \"public\".\"precedents\" to \"service_role\"","grant trigger on table \"public\".\"precedents\" to \"service_role\"","grant truncate on table \"public\".\"precedents\" to \"service_role\"","grant update on table \"public\".\"precedents\" to \"service_role\"","grant delete on table \"public\".\"properties\" to \"anon\"","grant insert on table \"public\".\"properties\" to \"anon\"","grant references on table \"public\".\"properties\" to \"anon\"","grant select on table \"public\".\"properties\" to \"anon\"","grant trigger on table \"public\".\"properties\" to \"anon\"","grant truncate on table \"public\".\"properties\" to \"anon\"","grant update on table \"public\".\"properties\" to \"anon\"","grant delete on table \"public\".\"properties\" to \"authenticated\"","grant insert on table \"public\".\"properties\" to \"authenticated\"","grant references on table \"public\".\"properties\" to \"authenticated\"","grant select on table \"public\".\"properties\" to \"authenticated\"","grant trigger on table \"public\".\"properties\" to \"authenticated\"","grant truncate on table \"public\".\"properties\" to \"authenticated\"","grant update on table \"public\".\"properties\" to \"authenticated\"","grant delete on table \"public\".\"properties\" to \"service_role\"","grant insert on table \"public\".\"properties\" to \"service_role\"","grant references on table \"public\".\"properties\" to \"service_role\"","grant select on table \"public\".\"properties\" to \"service_role\"","grant trigger on table \"public\".\"properties\" to \"service_role\"","grant truncate on table \"public\".\"properties\" to \"service_role\"","grant update on table \"public\".\"properties\" to \"service_role\"","grant delete on table \"public\".\"requisitions\" to \"anon\"","grant insert on table \"public\".\"requisitions\" to \"anon\"","grant references on table \"public\".\"requisitions\" to \"anon\"","grant select on table \"public\".\"requisitions\" to \"anon\"","grant trigger on table \"public\".\"requisitions\" to \"anon\"","grant truncate on table \"public\".\"requisitions\" to \"anon\"","grant update on table \"public\".\"requisitions\" to \"anon\"","grant delete on table \"public\".\"requisitions\" to \"authenticated\"","grant insert on table \"public\".\"requisitions\" to \"authenticated\"","grant references on table \"public\".\"requisitions\" to \"authenticated\"","grant select on table \"public\".\"requisitions\" to \"authenticated\"","grant trigger on table \"public\".\"requisitions\" to \"authenticated\"","grant truncate on table \"public\".\"requisitions\" to \"authenticated\"","grant update on table \"public\".\"requisitions\" to \"authenticated\"","grant delete on table \"public\".\"requisitions\" to \"service_role\"","grant insert on table \"public\".\"requisitions\" to \"service_role\"","grant references on table \"public\".\"requisitions\" to \"service_role\"","grant select on table \"public\".\"requisitions\" to \"service_role\"","grant trigger on table \"public\".\"requisitions\" to \"service_role\"","grant truncate on table \"public\".\"requisitions\" to \"service_role\"","grant update on table \"public\".\"requisitions\" to \"service_role\"","create policy \"Enable update/all access for all users\"
on \"public\".\"requisitions\"
as permissive
for all
to public","create policy \"enable read access for requisitions\"
on \"public\".\"requisitions\"
as permissive
for select
to public
using (true)","create schema if not exists \"utils\""}', 'initial_structure'),
	('20231229122413', '{"create schema private","insert into storage.buckets (id, name)
values (''files'', ''files'')
on conflict do nothing","create or replace function private.uuid_or_null(str text)
returns uuid
language plpgsql
as $$
begin
  return str::uuid;
  exception when invalid_text_representation then
    return null;
  end;
$$","create policy \"Authenticated users can upload files\"
on storage.objects for insert to authenticated with check (
  bucket_id = ''files'' and
    owner = auth.uid() and
    private.uuid_or_null(path_tokens[1]) is not null
)","create policy \"Users can view their own files\"
on storage.objects for select to authenticated using (
  bucket_id = ''files'' and owner = auth.uid()
)","create policy \"Users can update their own files\"
on storage.objects for update to authenticated with check (
  bucket_id = ''files'' and owner = auth.uid()
)","create policy \"Users can delete their own files\"
on storage.objects for delete to authenticated using (
  bucket_id = ''files'' and owner = auth.uid()
)"}', 'files'),
	('20240101175041', '{"create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text not null unique,
  first_name text,
  last_name text, 
  initials text,

  primary key (id)
)","alter table public.profiles enable row level security","create policy \"Public profiles are viewable by everyone.\"
  on profiles for select
  using ( true )","create policy \"Users can insert their own profile.\"
  on profiles for insert
  with check ( auth.uid() = id )","create policy \"Users can update own profile.\"
  on profiles for update
  using ( auth.uid() = id )","-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$","-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row 
  execute procedure public.handle_new_user()"}', 'profiles'),
	('20240102102250', '{"create table documents (
  id bigint primary key generated always as identity,
  name text not null,
  storage_object_id uuid not null references storage.objects (id),
  created_by uuid not null references auth.users (id) default auth.uid(),
  created_at timestamp with time zone not null default now()
)","create view documents_with_storage_path_and_created_by_email
with (security_invoker=true)
as
  select 
    documents.*, 
    storage.objects.name as storage_object_path,
    profiles.email as created_by_email
  from documents
  join storage.objects
    on storage.objects.id = documents.storage_object_id
  join profiles
    on profiles.id = documents.created_by","alter table documents enable row level security","create policy \"Users can insert documents\"
on documents for insert to authenticated with check (
  auth.uid() = created_by
)","create policy \"Users can query their own documents\"
on documents for select to authenticated using (
  auth.uid() = created_by
)","-- Create a function to get the supabase_url from the vault
create function supabase_url()
returns text
language plpgsql
security definer
as $$
declare
  secret_value text;
begin
  select decrypted_secret into secret_value from vault.decrypted_secrets where name = ''supabase_url'';
  return secret_value;
end;
$$","-- Create a trigger to process new documents when they''re inserted.
create function private.handle_storage_update()
returns trigger
language plpgsql
as $$
declare
  document_id bigint;
  result int;
begin
  insert into documents (name, storage_object_id, created_by)
    values (new.path_tokens[2], new.id, new.owner)
    returning id into document_id;

  select
    net.http_post(
      url := supabase_url() || ''/functions/v1/process'',
      headers := jsonb_build_object(
        ''Content-Type'', ''application/json'',
        ''Authorization'', current_setting(''request.headers'')::json->>''authorization''
      ),
      body := jsonb_build_object(
        ''document_id'', document_id
      )
    )
  into result;

  return null;
end;
$$","create trigger on_file_upload
  after insert on storage.objects
  for each row
  execute procedure private.handle_storage_update()"}', 'documents'),
	('20240102124218', '{"-- Enable the pgvector extension to work with embedding vectors
create extension if not exists vector with schema extensions","create table document_sections (
  id bigint primary key generated always as identity,
  document_id bigint not null references documents (id),
  content text not null, -- corresponds to Document.pageContent
  metadata jsonb, -- corresponds to Document.metadata
  embedding vector (384)-- 1536 works for OpenAI embeddings, change if needed
)","-- Create an index on the embedding vector
-- create index on document_sections using hnsw (embedding vector_ip_ops);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table document_sections 
  enable row level security","-- Create a policy to allow authenticated users to insert document sections
create policy \"Users can insert document sections\"
on document_sections for insert to authenticated with check (
  document_id in (
    select id
    from documents
    where created_by = auth.uid()
  )
)","-- Create a policy to allow authenticated users to query document sections
create policy \"Users can query their own document sections\"
on document_sections for select to authenticated using (
  document_id in (
    select id
    from documents
    where created_by = auth.uid()
  )
)","-- Create a policy to allow authenticated users to update document sections
create policy \"Users can update their own document sections\"
on document_sections for update to authenticated using (
  document_id in (
    select id
    from documents
    where created_by = auth.uid()
  )
) with check (
  document_id in (
    select id
    from documents
    where created_by = auth.uid()
  )
)","-- CREATE POLICY \"Allow langchain querying for authenticated users\" 
--   ON \"public\".\"document_sections\"
-- AS PERMISSIVE FOR SELECT
-- TO authenticated
-- USING (true);

-- General purpose trigger function to generate text embeddings
-- on newly inserted rows.
--
-- Calls an edge function at `/embed` in batches that asynchronously
-- generates the embeddings and stores them on each record.
-- 
-- Trigger is expected to have the format:
--
-- create trigger <trigger_name>
-- after insert on <table_name>
-- referencing new table as inserted
-- for each statement
-- execute procedure private.embed(<content_column>, <embedding_column>);
--
-- Expects 3 arguments: `private.embed(<content_column>, <embedding_column>, <batch_size>)`
-- where the first argument indicates the source column containing the text content,
-- the second argument indicates the destination column to store the embedding,
-- and the third argument indicates the number of records to include in each edge function call.
create function private.embed() 
returns trigger 
language plpgsql
as $$
declare
  content_column text = TG_ARGV[0];
  embedding_column text = TG_ARGV[1];
  batch_size int = TG_ARGV[2];
  batch_count int = ceiling((select count(*) from inserted) / batch_size::float);
  result int;
begin

  for i in 0 .. (batch_count-1) loop
  select
    net.http_post(
      url := supabase_url() || ''/functions/v1/embed'',
      headers := jsonb_build_object(
        ''Content-Type'', ''application/json'',
        ''Authorization'', current_setting(''request.headers'')::json->>''authorization''
      ),
      body := jsonb_build_object(
        ''ids'', (select json_agg(ds.id) from (select id from inserted limit batch_size offset i*batch_size) ds),
        ''table'', TG_TABLE_NAME,
        ''contentColumn'', content_column,
        ''embeddingColumn'', embedding_column
      )
    )
  into result;
  end loop;

  return null;
end;
$$","create trigger embed_document_sections
  after insert on document_sections
  referencing new table as inserted
  for each statement
  execute procedure private.embed(content, embedding, 5)"}', 'document_sections'),
	('20240107170402', '{"-- Matches document sections using vector similarity search on embeddings
--
-- Returns a setof document_sections so that we can use PostgREST resource embeddings (joins with other tables)
-- Additional filtering like limits can be chained to this function call
create or replace function match_document_sections(embedding vector(384), match_threshold float)
returns setof document_sections
language plpgsql
as $$
#variable_conflict use_variable
begin
  return query
  select *
  from document_sections

  -- The inner product is negative, so we negate match_threshold
  where document_sections.embedding <#> embedding < -match_threshold

  -- Our embeddings are normalized to length 1, so cosine similarity
  -- and inner product will produce the same query results.
  -- Using inner product which can be computed faster.
  --
  -- For the different distance functions, see https://github.com/pgvector/pgvector
  order by document_sections.embedding <#> embedding;
end;
$$"}', 'match'),
	('20240109170139', '{"CREATE TABLE folders (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  folder_name TEXT NOT NULL,
  parent_folder_id BIGINT REFERENCES folders(id) ON DELETE CASCADE,
  created_by UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
)","alter table folders enable row level security","create policy \"Users can insert folders\"
on folders for insert to authenticated with check (
  auth.uid() = created_by
)","create policy \"Users can query their own folders\"
on folders for select to authenticated using (
  auth.uid() = created_by
)"}', 'folders');


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 22, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: document_sections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."document_sections_id_seq"', 1, false);


--
-- Name: documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."documents_id_seq"', 17, true);


--
-- Name: folders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."folders_id_seq"', 5, true);


--
-- Name: precedents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."precedents_id_seq"', 1, false);


--
-- Name: properties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."properties_id_seq"', 1, false);


--
-- Name: requisitions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."requisitions_id_seq"', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
