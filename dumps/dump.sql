PGDMP      "                    {            app    15.3    15.1 )    >           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            @           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            A           1262    16384    app    DATABASE     n   CREATE DATABASE app WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE app;
                postgres    false            �            1259    16401    lesson-students    TABLE     �   CREATE TABLE public."lesson-students" (
    id integer NOT NULL,
    "lessonId" integer NOT NULL,
    "studentId" integer NOT NULL,
    visit boolean DEFAULT false NOT NULL
);
 %   DROP TABLE public."lesson-students";
       public         heap    postgres    false            �            1259    16400    lesson-students_id_seq    SEQUENCE     �   CREATE SEQUENCE public."lesson-students_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."lesson-students_id_seq";
       public          postgres    false    219            B           0    0    lesson-students_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."lesson-students_id_seq" OWNED BY public."lesson-students".id;
          public          postgres    false    218            �            1259    16415    lesson-teachers    TABLE     o   CREATE TABLE public."lesson-teachers" (
    "lessonsId" integer NOT NULL,
    "teachersId" integer NOT NULL
);
 %   DROP TABLE public."lesson-teachers";
       public         heap    postgres    false            �            1259    16393    lessons    TABLE     �   CREATE TABLE public.lessons (
    id integer NOT NULL,
    date date NOT NULL,
    title character varying(255) NOT NULL,
    status integer DEFAULT 0
);
    DROP TABLE public.lessons;
       public         heap    postgres    false            �            1259    16392    lessons_id_seq    SEQUENCE     �   CREATE SEQUENCE public.lessons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.lessons_id_seq;
       public          postgres    false    217            C           0    0    lessons_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.lessons_id_seq OWNED BY public.lessons.id;
          public          postgres    false    216            �            1259    16409    students    TABLE     d   CREATE TABLE public.students (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);
    DROP TABLE public.students;
       public         heap    postgres    false            �            1259    16408    students_id_seq    SEQUENCE     �   CREATE SEQUENCE public.students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.students_id_seq;
       public          postgres    false    221            D           0    0    students_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.students_id_seq OWNED BY public.students.id;
          public          postgres    false    220            �            1259    16386    teachers    TABLE     d   CREATE TABLE public.teachers (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);
    DROP TABLE public.teachers;
       public         heap    postgres    false            �            1259    16385    teachers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teachers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.teachers_id_seq;
       public          postgres    false    215            E           0    0    teachers_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.teachers_id_seq OWNED BY public.teachers.id;
          public          postgres    false    214            �           2604    16404    lesson-students id    DEFAULT     |   ALTER TABLE ONLY public."lesson-students" ALTER COLUMN id SET DEFAULT nextval('public."lesson-students_id_seq"'::regclass);
 C   ALTER TABLE public."lesson-students" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            �           2604    16396 
   lessons id    DEFAULT     h   ALTER TABLE ONLY public.lessons ALTER COLUMN id SET DEFAULT nextval('public.lessons_id_seq'::regclass);
 9   ALTER TABLE public.lessons ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            �           2604    16412    students id    DEFAULT     j   ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_id_seq'::regclass);
 :   ALTER TABLE public.students ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    221    221            �           2604    16389    teachers id    DEFAULT     j   ALTER TABLE ONLY public.teachers ALTER COLUMN id SET DEFAULT nextval('public.teachers_id_seq'::regclass);
 :   ALTER TABLE public.teachers ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215            8          0    16401    lesson-students 
   TABLE DATA           O   COPY public."lesson-students" (id, "lessonId", "studentId", visit) FROM stdin;
    public          postgres    false    219   �.       ;          0    16415    lesson-teachers 
   TABLE DATA           F   COPY public."lesson-teachers" ("lessonsId", "teachersId") FROM stdin;
    public          postgres    false    222   d/       6          0    16393    lessons 
   TABLE DATA           :   COPY public.lessons (id, date, title, status) FROM stdin;
    public          postgres    false    217   �/       :          0    16409    students 
   TABLE DATA           ,   COPY public.students (id, name) FROM stdin;
    public          postgres    false    221   �0       4          0    16386    teachers 
   TABLE DATA           ,   COPY public.teachers (id, name) FROM stdin;
    public          postgres    false    215   �0       F           0    0    lesson-students_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."lesson-students_id_seq"', 27, true);
          public          postgres    false    218            G           0    0    lessons_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.lessons_id_seq', 22, true);
          public          postgres    false    216            H           0    0    students_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.students_id_seq', 6, true);
          public          postgres    false    220            I           0    0    teachers_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.teachers_id_seq', 6, true);
          public          postgres    false    214            �           2606    16414 '   students PK_7d7f07271ad4ce999880713f05e 
   CONSTRAINT     g   ALTER TABLE ONLY public.students
    ADD CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY (id);
 S   ALTER TABLE ONLY public.students DROP CONSTRAINT "PK_7d7f07271ad4ce999880713f05e";
       public            postgres    false    221            �           2606    16399 &   lessons PK_9b9a8d455cac672d262d7275730 
   CONSTRAINT     f   ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT "PK_9b9a8d455cac672d262d7275730" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.lessons DROP CONSTRAINT "PK_9b9a8d455cac672d262d7275730";
       public            postgres    false    217            �           2606    16391 '   teachers PK_a8d4f83be3abe4c687b0a0093c8 
   CONSTRAINT     g   ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8" PRIMARY KEY (id);
 S   ALTER TABLE ONLY public.teachers DROP CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8";
       public            postgres    false    215            �           2606    16419 .   lesson-teachers PK_c5bba59de3f320b3a15f08986d4 
   CONSTRAINT     �   ALTER TABLE ONLY public."lesson-teachers"
    ADD CONSTRAINT "PK_c5bba59de3f320b3a15f08986d4" PRIMARY KEY ("lessonsId", "teachersId");
 \   ALTER TABLE ONLY public."lesson-teachers" DROP CONSTRAINT "PK_c5bba59de3f320b3a15f08986d4";
       public            postgres    false    222    222            �           2606    16407 .   lesson-students PK_ddd3cbcae721f16200538fcfdc2 
   CONSTRAINT     p   ALTER TABLE ONLY public."lesson-students"
    ADD CONSTRAINT "PK_ddd3cbcae721f16200538fcfdc2" PRIMARY KEY (id);
 \   ALTER TABLE ONLY public."lesson-students" DROP CONSTRAINT "PK_ddd3cbcae721f16200538fcfdc2";
       public            postgres    false    219            �           1259    16421    IDX_78a6b5ad800b3e88b82d4b3fd2    INDEX     f   CREATE INDEX "IDX_78a6b5ad800b3e88b82d4b3fd2" ON public."lesson-teachers" USING btree ("teachersId");
 4   DROP INDEX public."IDX_78a6b5ad800b3e88b82d4b3fd2";
       public            postgres    false    222            �           1259    16420    IDX_aab0074a58126f49f8e65360a2    INDEX     e   CREATE INDEX "IDX_aab0074a58126f49f8e65360a2" ON public."lesson-teachers" USING btree ("lessonsId");
 4   DROP INDEX public."IDX_aab0074a58126f49f8e65360a2";
       public            postgres    false    222            �           2606    16437 .   lesson-teachers FK_78a6b5ad800b3e88b82d4b3fd2f    FK CONSTRAINT     �   ALTER TABLE ONLY public."lesson-teachers"
    ADD CONSTRAINT "FK_78a6b5ad800b3e88b82d4b3fd2f" FOREIGN KEY ("teachersId") REFERENCES public.teachers(id) ON UPDATE CASCADE ON DELETE CASCADE;
 \   ALTER TABLE ONLY public."lesson-teachers" DROP CONSTRAINT "FK_78a6b5ad800b3e88b82d4b3fd2f";
       public          postgres    false    215    3222    222            �           2606    16422 .   lesson-students FK_82c5887c5da7c5ab87d77a291e0    FK CONSTRAINT     �   ALTER TABLE ONLY public."lesson-students"
    ADD CONSTRAINT "FK_82c5887c5da7c5ab87d77a291e0" FOREIGN KEY ("lessonId") REFERENCES public.lessons(id);
 \   ALTER TABLE ONLY public."lesson-students" DROP CONSTRAINT "FK_82c5887c5da7c5ab87d77a291e0";
       public          postgres    false    219    3224    217            �           2606    16427 .   lesson-students FK_a04e1d9a14b5f9692cfba96783b    FK CONSTRAINT     �   ALTER TABLE ONLY public."lesson-students"
    ADD CONSTRAINT "FK_a04e1d9a14b5f9692cfba96783b" FOREIGN KEY ("studentId") REFERENCES public.students(id);
 \   ALTER TABLE ONLY public."lesson-students" DROP CONSTRAINT "FK_a04e1d9a14b5f9692cfba96783b";
       public          postgres    false    219    3228    221            �           2606    16432 .   lesson-teachers FK_aab0074a58126f49f8e65360a2e    FK CONSTRAINT     �   ALTER TABLE ONLY public."lesson-teachers"
    ADD CONSTRAINT "FK_aab0074a58126f49f8e65360a2e" FOREIGN KEY ("lessonsId") REFERENCES public.lessons(id) ON UPDATE CASCADE ON DELETE CASCADE;
 \   ALTER TABLE ONLY public."lesson-teachers" DROP CONSTRAINT "FK_aab0074a58126f49f8e65360a2e";
       public          postgres    false    3224    222    217            8   o   x^%��� �v1Ql�^����!1��nXp^O�Xa��6�a���}B�����DNW:mA��Ŕ)˴��-S"���4=4+����ԗMVe�2� ��s���; �      ;   ]   x^ƹ�0�X,�c��zq�u� ���|��4iѢM��W��C��R�\r)��RJ���¼��FiK[:ґ�tQ��C.�R��1��K�      6   �   x^U�K�0D����+;��d�]�.r���%��c)��*ORޯ��~(L=��ϡ�P��.\y���M�`��6��`��d�"<�<��w����w��U��gG
�v�b�2�9_z8[��q��T�2��5ȣ�G+�I�i�'���� �~t�Q�!��+�ߝ��BA|���ID?�>x�      :   1   x^3�̭.)MI�+1�2Bp���c.Ǆ��1�2Cp̸b���� xS      4   /   x^3�,IML�H-2�2�1���aLc.ӄ��4�2�1͸b���� (�     