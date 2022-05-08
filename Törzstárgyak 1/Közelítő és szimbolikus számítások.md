## Közelítő és szimbolikus számítások

> Numerikus stabilitás jelentése: A függvény argumantumainak megváltozása meggkora eltérést eredményez a függvényértékben. Ha nagyot akkor numerikusan nem stabilis.

### 1. Eliminációs módszerek, mátrixok trianguláris felbontásai. Lineáris egyenletrendszerek megoldása iterációs módszerekkel. Mátrixok sajátértékeinek, és sajátvektorainak numerikus meghatározása.

#### Eliminációs módszerek

$$
\begin{align}
    a_{11}x_1 + a_{12}x_2 + ... + a_{1n}x_n & = b_1\\
    a_{21}x_1 + a_{22}x_2 + ... + a_{2n}x_n & = b_2\\
                                            & ~  ...\\
    a_{n1}x_1 + a_{n2}x_2 + ... + a_{nn}x_n & = b_n\\
\end{align}
$$

Tegyük fel, hogy $A \in \mathbb{C}^{n \times n}$, és $b \in \mathbb{C}^n$. Az $Ax = b$ lineáris egyenletrendszernek pontosan akkor van egyetlen megoldása, ha $A$ nem szinguláris (azaz $detA \ne 0$). Ekkor a megoldás $x = A^{-1} b$. A megoldás $i$. komponensét megadja a Cramer szabály is:

$$
x_i = \frac{det A^{(i)}}{detA}
$$

> $A^{(i)}$ mátrixot úgy kapjuk, hogy az $A$ mátrix $i$. oszlopát kicseréljük a $b$ vektorral.

> Gyakorlatban ez a tétel nem használatos, mert az inverz számolás nagy műveletigényű lehet, a Cramer szabály pedig numerikusan nem stabilis.

##### Lineáris egyenletrendszerek megoldási módjai

- Direkt módszerek: Véges sok, meghatározott számú lépésben megtalálják a megoldást.

- Iterációs módszerek: Minden iterációs lépésben jobb és jobb közelítést adják a megoldásnak.
  
  - Magát a megoldást általában nem érik el véges lépésben.

##### Egyenletrendszerek ekvivalenciája

Két egyenletrendszert akkor tekintünk ekvivalensnek, ha a megoldásaik halmaza megegyezik.

Megengedett transzformációk:

- Egy egyenletnek egy nem nulla számmal való beszorzássa.

- Egy egyenlet konstansszorosának hozzáadása egy másik egyenlethez.

##### Egyenletrendszerek megoldása

Ilyen átalakításokkal próbálunk háromszögmátrixot vagy diagonális mátrixot létrehozni. Ez azért jó, mert ilyen alakban az egyenletrendszer könnyen megoldható:

$$
\begin{bmatrix}
u_{11} & u_{12} & u_{13} \\
0 & u_{22} & u_{23} \\
0 & 0 & u_{33} \\
\end{bmatrix}

\begin{bmatrix}
x_1 \\
x_2 \\
x_3 \\
\end{bmatrix}

=

\begin{bmatrix}
b_1 \\
b_2 \\
b_3 \\
\end{bmatrix}
$$

Ilyen az esetben a megoldás könnyen kifejezhető:

$$
\begin{align}
x_3 & = \frac{b_3}{u_{33}} \\
\\
x_2 & = \frac{b_2 - u_{23}x_3}{u_{22}} \\
\\
x_1 & = \frac{b_1 - u_{12}x_2 - u_{13}x_3}{u_{11}}
\end{align}
$$

###### Matlab program

A fentebbi példa módszerének altalánosítása felső trianguláris mátrixokra.

```matlab
function x = UTriSol(U, b)
n = length(b);
x = zeros(n, 1);
for j = n : -1 : 2
    x(j) = b(j) / U(j, j);
    b(1:j - 1) = b(1:j - 1) - x(j) * U(1:j - 1, j);
end
x(1) = b(1) / U(1, 1);
```

> Műveletigénye $O(\frac{n^2}{2})$

##### Eliminációs mátrix

 A $G_j \in \mathcal{R}^{n \times n}$ **eliminációs mátrix**, ha felírható $G_j = I + g^{(j)}e_j^T$ alakban valamely $1 \le j \le n$-re egy olyan $g^{(j)}$ vektorral, amelynek $j$-dik komponense, $g_j^{(j)} = 0$

###### Példa

$$
j = 3; G_j =
\begin{bmatrix}
1 & 0 & 2 \\
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

Könnyen megadható olyan eliminációs mátrix, amivel egyadott oszlop (vagy egy önálló vektor) **egy adott koordináta alatti elemei kinullázhatóak**, például a fentebbi $A$ mátrixhoz ($a_{11}-et$ módosítottam $2$-re, hogy szemléletesebb legyen a példa):

$$
\begin{bmatrix}
1 & 0 & 0 \\
-3 & 1 & 0 \\
-\frac{9}{2} & 0 & 1 \\
\end{bmatrix}

\begin{bmatrix}
2 & 2 & 4 \\
6 & 8 & 2 \\
9 & 1 & 0 \\
\end{bmatrix}

=

\begin{bmatrix}
2 & 2 & 4 \\
0 & 2 & -10 \\
0 & -8 & -18 \\
\end{bmatrix}
$$

Az első oszlopban ténylegesen kinullázódott két sor, már csak a második oszlopban kellene az utolsó sort kinullázni, és egy könnyen megoldható egyenletrendszer együtthatómátrixát kapnánk.

#### Mátrixok trianguláris felbontásai

##### LU felbontás

Át akarjuk alakítani az $Ax = b$ egyenletrendszert úgy, hogy a bal oldalon háromszögmátrix szerepeljen.

Ezt valamennyi eliminációs mátrix sorozatával meg tudjuk tenni:

$MAx = M_{n - 1} ... M_1A_x = M_{n-1} ... M_1 b = Mb$

> Hasonló felbontás megkezdése történt az előző példában.

Ekkor $L = M^{-1}$, $U = MA$

> Könnyű számolni, mert az eliminációs mátrix inverze úgy számolható, hogy a főátlón kívüli elemeket negáljuk.

###### Egyenletrendszer megoldása LU felbontással

$Ax = b$ helyett az $LUx = b$ egyenletrendszert oldhatjuk meg. Ezt **két lépésben** elvégezve végig háromszögmátrixokkal dolgozhatunk.

Ezzel megkaptuk a **Gauss-elimináció** módszerét:

1. Az $A$ mátrix $LU$ felbontása

2. $Ly = b$ megoldása $y$-ra (az $y$ egy új, mesterséges változó)

3. $Ux = y$ megoldása $x$-re

```matlab
[L, U] = LU(A);
y = LTriSol(L, b);
x = UTriSol(U, y);
```

###### * LU felbontás Matlabban

```matlab
function [L, U] = LU(A)
[m, n] = size(A);
for k = 1:n-1
    A(k+1:n, k) = A(k+1:n, k) / A(k, k);
    A(k+1:n, k+1:n) = A(k+1:n, k+1:n) - A(k+1_n, k) * A(k, k+1_n);
end
L = eye(n, n) + tril(A, -1);
U = triu(A);
```

###### Főelemkiválasztás

Az LU felbontás csak akkor sikeres, ha az $A$ mátrix nem szinguláris, és minden generáló elem (főátló-beli elemek) nullától különböző (mivel azokkal leosztunk). Ha az utóbbi nem teljesül, még lehet, hogy van felbontás, átrendezéssel, ami ekvivalens feladatot eredményez. Ezt az eljárást főelemkiválasztásnak hívjuk.

Ezeket a sorcseréket egy **permutációs mátrixszal** való beszorzással végezzük.

A $P_{ij}$ permutációs mátrix egy egységmátrix, melyben az $i$-edik, és $j$-edik sor fel van cserélve. Dimenziószáma megegyezik a "permutálandó" mátrixéval.

Az $A$ mátrixot ezzel a $P_{ij}$-vel balról szorozva egy olyan mátrixot kapunk, ami az $A$ mátrix, melyben az $i$-edik, és $j$-edik sor fel van cserélve.

Jobbról szorozva az oszlopok cserélődnek.

##### Cholesky felbontás

**Rirka mátrixok** esetén hatékonyabb, mint a Gauss-elimináció.

Ha az $A$ mátrix szimmetrikus, és pozitív definit, akkor az LU felbontás $U = L^T$ alakban létezik, tehát $A = LL^T$, ahol $L$ alsó háromszögmátrix, amelynek diagonális elemei pozitív számok. Az ilyen felbontást **Cholesky-felbontásnak** hívjuk.

> Pozitív definit = minden sajátértéke pozitív

###### Matlab implementáció

```matlab
function [x] = LGPD(A, b);
R = chol(A);
y = R' \ b;
x = R \ y;
```

> A `'` operátor transzponál, a `\` pedig: `1R \ y := Az Rx = y egyenletrendszer megoldása`

A Cholesky felbontás numerikusan stabilis, műveletigénye $ \frac{1}{3} n^3 + O(n^2)$. Feleannyi, mint egy általános mátrix LU felbontásáé.

##### QR ortogonális felbontás

Egy $Q$ négyzetes mátrix ortogonális, ha $QQ^T = Q^TQ = I$.

Az ortogonális transzformációk megtartják a kettes normát, így numerikusan stabilisak.

Lineáris egyenletrendszer megoldása az $A = QR$ felbontással:

$$
Rx = Q^Tb
$$

Matlabban

```matlab
[Q, R] = qr(A, 0);
x = R \ (Q' * b);
```

Tetszőleges $A$ négyzetes valós reguláris mátrixnak létezik az $A = QR$ felbontása ortogonális és felső háromszögmátrixra.

#### Lineáris egyenletrendszerek megoldása iterációs módszerekkel

A korábbi megoldási módok **direkt módszerek voltak**, véges lépésben megtalálták a megoldást. A következőek iterációs módszerek, minden iterációban egyre jobb közelítéseket adnak, de általában véges lépésben nem találják meg a megoldást. Mégis nagyobb méterű, sűrűbb mátrixok esetén előnyös a használatuk.

##### Jacobi iteráció

> Nem minden esetben konvergál a jacobi iteráció! (A megoldás felé)

A módszer:

1. Felírjuk az egyenleteket olyan formában, hogy a bal oldalra rendezünk 1-1 változót.

2. Választunk egy kiindulási $x_0$ vektort.

3. Elkezdjük az iterációt, mindig a megkapott értékeket behelyettesítjük a kifejezett báltozó jobb oldalába (nulladik iterációban $x_0$-t).

4. Ezt addig ismételgethetjük, amíg az eltérés két eredmény között megfelelően kicsi.

###### Példa

$$
\begin{align}
-2x_1 + x_2 + 5x_3  & = 4 \\
\\
4x_1 - x_2 + x_3 & = 4 \\
\\
2x_1 - 4x_2 + x_3 & = -1
\end{align}
$$

Ehhez tartozó **iterációs egyenletek**:

$$
\begin{align}
x_1 & = \frac{-4 + x_2 + 5x_3}{2} \\
\\
x_2 & = -4 + 4x_1 + x_3 \\
\\
x_3 & = -1 - 2x_1 + 4x_2
\end{align}
$$

> Ez éppenséggel az $x_1 = (1, 2, 3)^T$ kezdővektorral divergál a megoldástól.

> $Bx^{(k)} + c$ az **iterációs egyenleteknek** az általános, tömör felírása.

###### Jacobi iteráció konvergenciája

Az, hogy a $B$ mátrix **diagonálisan domináns**, elegendő feltétele a Jacobi iteráció konvergenciájának.

> Egy mátrix akkor diagonálisan domináns, ha minden sorban a diagonális elem abszolútértékben nagyobb, mint az összes többi sor-beli elem abszolútértékben vett összege.

##### Iterációs módszerek konvergenciája

Vizsgáljuk meg az $x^{(k+1)} = Bx^{(k)} + c$ iteráció által definiált $\{ ~ x^{(k)} ~ \}$ sorozat konvergenciáját. Jelöljük az eredeti egyenletrendszerünk megoldásár $x^*$-al. Az $e_k = x^{(k)} - x^*$ eltérésre a következő állítás érvényes:

Tetszőleges $x^{(0)}$ kezdővektor, esetén a $k$-adik közelítés eltérése az $x^*$ megoldástól $e_k = B^k e_0$

Következmény: Ha a $B$ mátrix **nilpotens**, akkor $B^j e_0 = 0$, tehát az iterációs eljárás véges sok lépésben megtalálja  amegoldást.

> A nilpotens azt jelenti, hogy van olyan $j$ index, amire $B^j =0$

**Globális konvergencia**: Akkor mondjuk, hogy egy iterációs sorozat globálisan konvergens, ha minden indulóvektorral ugyan azt a megoldást kapjuk.

Az  $x^{(k+1)} = Bx^{(k)} + c$ iteráció akkor és csak akkor globálisan konvergens, ha $\rho(B) < 1$.

> $\rho(B)$ a $B$ mátrix **spektrálrádiusz**-át jelenti, ami a sajátértékeinek abszolút értékben vett maximuma.

##### Gauss-Seidel iteráció

Annyiban tér el a Jacobi-iterációtól, hogy az iterációs egyenletek jobb oldalán felhasználjuk az adott iterációban már megtalált közelítő értékeket.

Például ha $x_1^{(k+1)}$ már ismert, akkot a továbbiakban $x_1^{(k)}$ helyett $x_1^{(k+1)}$-et használjunk.

Ez valamivel gyorsítja a konvergenciát.

> Jacobi, Gauss-Seidel matlab kódok kellenek?

#### Mátrixok sajátértékeinek, és sajátvektorainak numerikus meghatározása

Legyen adott egy $A$ négyzetes mátrix. Adjuk meg a $\lambda$ számot, és az $x \ne 0$ vektort úgy, hogy $Ax = \lambda x$.

Ekkor $\lambda$ az $A$ sajátértéke, és $x$ az $A$ sajátvektora.

> Baloldali sajátérték, sajátvektor: $y^T A = \lambda y^T$

Mátrix **spektruma**: Sajátértékeinek halmaza, jele: $\lambda(A)$.

Mátrix **spektrálrádiusza**: $max\{ ~ | \lambda | : \lambda \in \lambda(A) ~ \}$, jele: $\rho(A)$

##### Sajátvektor, sajátérték jelentősége

A sajátvektorok irányába eső vektorokat az $A$ mátrix megnyújtja az adott sajátvektorhoz tartozó sajátértéknek megfelelően.

##### Sajátértékek, sajátvektorok nem egyértelműek

- Egységmátrixnak az 1 $n$-szeres sajátértéke

- Egy sajátvektorral együtt annak minden nem nulla számmal szorzottja is ugyanahhoz a sajátértékhez tartozó sajátvektora

##### Sajátértékek, sajátvektorok meghatározása

Megkaphatjuk a $(A - \lambda I)x = 0$ homogén lineáris egyenletrendszerből. Ennek pontosan akkor van nulla vektortól különböző megoldása, ha az $A - \lambda I$ mátrix szinguláris.

Emiatt a sajátértékeket leírja a $det (A - \lambda I) = 0$ egyenlet. Ennek baloldalán levő $n$-edfokú polinomot az $A$ mátrix **karakterisztikus polinomjának** nevezzük.

##### * Sajátértékek korlátai

Tetszőleges $A$ mátrixra és bármely mátrixnormára $\rho(A) \le ||A||$.

A mátrix összes sajátértéke benne van a 

$$
K_i = \left\{ z \in C ~ \Bigg| ~ |z - a_{ii}| \le \sum_{k=1, k \ne i}^n |a_{ik}| \right\}
$$



##### Hatványmódszer

> A.K.A. *von Mieses vektoriterációja*

A legnagyobb abszolútértékű sajátérték meghatározására szolgál.

Az algoritmus iterációs képlete:

$$
y^k = Ax^k, x^{k+1} = \frac{y^k}{||y^k||}
$$

Kiindulási vektor:

- $x^0 \ne 0$, és

- $x_0$ nem merőleges a legnagyobb abszolút értékű sajátértékhez tartozó sajátvektorra.

###### Matlabban

```matlab
function lambda = hatv(A);
x = [rand(1) rand(1) rand(1)];
for i = 1:100
    y = A * x;
    lambda = y ./ x;
    r = (x' * y) / (x' * x);
    x = y / norm(y);
end
```

> A `./` komponensenként való osztás.

Az egyes iterációban kapott eredmények:

- `r`: Rayleigh-féle hányadossal kapott eredmény.

- `x`: Komponensenkénti becsléssel kapott eredmény.

### 2. Érintő, szelő, és húr módszer, a konjugált gradiens eljárás. Lagrange interpoláció. Numberikus integrálás.
