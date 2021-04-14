<template>
    <div>
        <table class="table table-responsive">
            <slot name="caption"></slot>
            <thead>
                <slot name="thead"></slot>
            </thead>
            <tbody>
                <slot name="tbody"></slot>
            </tbody>
        </table>        
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
tbody{
    background-color: #ffffff;
}
.table td, .table th {
    border-top: 0px !important;
    border-bottom-width:0px !important;

}
.table {
    border-collapse: separate;
    border-spacing: 0px 0.5rem;
}
.table thead th {
    border-bottom: 0px;
    font-weight:900px;
    font-size: 14px;
    color:#c0c0c0;
}
table tbody tr:hover {
    background-color:var(--hoverBgColor);

}

a{
    color:var(--green);
    font-weight:900;
}


</style>