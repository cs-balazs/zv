## Közelítő és szimbolikus számítások

### 1. Eliminációs módszerek, mátrixok trianguláris felbontásai. Lineáris egyenletrendszerek megoldása iterációs módszerekkel. Mátrixok sajátértékeinek, és sajátvektorainak numerikus meghatározása.

#### Eliminációs módszerek

**Lineáris egyenletrendszer** mátrixos reprezentációja:

$$
\begin{align}
    a_{11}x_1 + a_{12}x_2 + ... + a_{1n}x_n & = a_{1, n+1}\\
    a_{21}x_1 + a_{22}x_2 + ... + a_{2n}x_n & = a_{2, n+1}\\
                                            & ~  ...\\
    a_{n1}x_1 + a_{n2}x_2 + ... + a_{nn}x_n & = a_{n, n+1}\\
\end{align}
$$

Komponensek:

- $A \in \mathcal{R}^{n \times n}$  regulárisegyütthatómártix

> Reguláris = determinánsa nem 0

- $a \in \mathcal{R}^n$ jobb oldalhoz tartozó mátrix

- $x_1, ..., x_n$ ismeretlenek

> Jelölés: $\hat{A} := (Aa) \in \mathcal{R}^{n \times (n + 1)}$. Ez egy tömörebb írásmódja az együtthatóknak és a jobb oldalnak, ennek egy sora jellemzi az egyenletrendszer egy sorát.

##### Eliminációs mátrix

 A $G_j \in \mathcal{R}^{n \times n}$ **eliminációs mátrix**, ha felírható $G_j = I + g^{(j)}e_j^T$ alakban valamely $1 \le j \le n$-re egy olyan $g^{(j)}$ vektorral, amelynek $j$-dik komponense, $g_j^{(j)} = 0$

###### Példa

$$
j = 3; G_j =
\begin{bmatrix}1 & 0 & 2 \\
0 & 1 & 3 \\
0 & 0 & 1 \\
\end{bmatrix}

$$

$j = 3$ a mátrix 3. oszlopában látszódik is, csak ott tér el egy egységmátrixtól.

$G_j$ komponensei:

$$
g^{(j)} = 
\begin{bmatrix}
2 \\
3 \\
0 \\
\end{bmatrix} ;
e_j^T =
\begin{bmatrix}
~ 0 ~ 0 ~ 1 ~ \\
\end{bmatrix}
$$

$j = 3$ miatt a $g^{(j)}$ harmadik sora nulla, illetve az $e_j^T$ harmadik koordinátája is nulla.

###### Eliminációs mártix jelentősége

Egy $A \in \mathcal{n \times n}$ mátrixot a $G_j = I + g^{(j)}e_j^T$ eliminációs mátrixszal balról szorozva a $B = G_jA$ szorzatmátrix úgy áll elő, hogy $A$ $1, 2, ..., n$-dik sorához rendre hozzáadjuk $A$ $j$-dik sorának $g_1^j, g_2^j, ..., g_3^j$-szeresét.

Például a következő mátrixok esetén:

$$
A = 
\begin{bmatrix}
1 & 2 & 4 \\
6 & 8 & 2 \\
9 & 1 & 0 \\
\end{bmatrix}

G_j = 
\begin{bmatrix}
1 & 0 & 2 \\
0 & 1 & 3 \\
0 & 0 & 1 \\
\end{bmatrix}

$$

Az eredmény:

$$
G_jA = 
\begin{bmatrix}
19 & 4 & 4 \\
33 & 11 & 2 \\
9 & 1 & 0 \\
\end{bmatrix}
$$

Az $A$ mátrix első sorához valóban kétszer a másodikhoz háromszor a harmadikhoz pedig nullaszor lett hozzáadva az $A$ mátrix harmadik sora.

### 2. Érintő, szelő, és húr módszer, a konjugált gradiens eljárás. Lagrange interpoláció. Numberikus integrálás.
