<!DOCTYPE html>
<html>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>
        body,html{
            display: flex;
            margin: 0;
            padding: 0;
            justify-content: center;
            align-items: center;
            background-color: #515c6f;
            width: 100%;
            height: 100%;
            font-family: Arial;
        }
        div{
            display: flex;
            flex-direction: row;
            gap: 0.2rem;
            background-color: #b09c92;
            justify-content: space-between;
            margin: 0.1rem;
            padding: 0.2rem;
            border-radius: 0.2rem;
        }
        .column{
            background-color:#495466;
            padding: 0.2rem;
            flex-direction: column;
        }
    </style>
    <body>
        <div class="column">
        <?php
            $val1 = (int)$_POST["value1"];
            $val2 = (int)$_POST["value2"];
            $sum = $val1 + $val2;
            $diff = $val1-$val2;
            $mul = $val1 * $val2;
            $div = "Divisione per 0";
            if($val1 !== 0 && $val2 !== 0){
                $div = $val1 / $val2;
            }
            echo "
                <div> <b> $val1 e $val2 </b></div>
                <div> Somma : <b> $sum </b></div>
                <div> Differenza : <b> $diff </b></div>
                <div> Moltiplicazione : <b> $mul </b></div>
                <div> Divisione : <b> $div </b></div>
            "
        ?>
        </div>
    </body>
</html>