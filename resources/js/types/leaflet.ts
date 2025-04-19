declare module 'leaflet' {
    namespace MarkerClusterGroup {
        interface Options extends L.LayerOptions {
            iconCreateFunction?: (cluster: MarkerCluster) => L.Icon | L.DivIcon;
        }
    }

    class MarkerCluster extends L.Marker {
        getChildCount(): number; // Devuelve el número de marcadores en el clúster
    }

    class MarkerClusterGroup extends L.FeatureGroup {
        constructor(options?: MarkerClusterGroup.Options);
        addLayer(layer: L.Layer): this;
        removeLayer(layer: L.Layer): this;
        clearLayers(): this;
        getBounds(): L.LatLngBounds;
    }

    function markerClusterGroup(options?: MarkerClusterGroup.Options): MarkerClusterGroup;
}
